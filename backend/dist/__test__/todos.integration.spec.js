"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe('Todos (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });
    afterEach(async () => {
        await app.close();
    });
    describe('/todos (POST)', () => {
        it('should create a new todo', () => {
            return request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Test Todo',
                isCompleted: false,
            })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.title).toBe('Test Todo');
                expect(res.body.isCompleted).toBe(false);
            });
        });
        it('should create a todo with default isCompleted as false', () => {
            return request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Test Todo',
            })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.title).toBe('Test Todo');
                expect(res.body.isCompleted).toBe(false);
            });
        });
        it('should validate required fields', () => {
            return request(app.getHttpServer())
                .post('/todos')
                .send({})
                .expect(400);
        });
        it('should validate title is not empty', () => {
            return request(app.getHttpServer())
                .post('/todos')
                .send({
                title: '',
                isCompleted: false,
            })
                .expect(400);
        });
    });
    describe('/todos (GET)', () => {
        it('should return empty array when no todos exist', () => {
            return request(app.getHttpServer())
                .get('/todos')
                .expect(200)
                .expect([]);
        });
        it('should return all todos', async () => {
            const todo1 = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'First Todo',
                isCompleted: false,
            })
                .expect(201);
            const todo2 = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Second Todo',
                isCompleted: true,
            })
                .expect(201);
            return request(app.getHttpServer())
                .get('/todos')
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveLength(2);
                expect(res.body[0].title).toBe('First Todo');
                expect(res.body[1].title).toBe('Second Todo');
            });
        });
    });
    describe('/todos/:id (GET)', () => {
        it('should return a specific todo', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Test Todo',
                isCompleted: false,
            })
                .expect(201);
            return request(app.getHttpServer())
                .get(`/todos/${createdTodo.body.id}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(createdTodo.body.id);
                expect(res.body.title).toBe('Test Todo');
                expect(res.body.isCompleted).toBe(false);
            });
        });
        it('should return 404 for non-existent todo', () => {
            return request(app.getHttpServer())
                .get('/todos/999')
                .expect(404);
        });
        it('should validate id parameter', () => {
            return request(app.getHttpServer())
                .get('/todos/invalid-id')
                .expect(400);
        });
    });
    describe('/todos/:id (PATCH)', () => {
        it('should update a todo', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Original Todo',
                isCompleted: false,
            })
                .expect(201);
            return request(app.getHttpServer())
                .patch(`/todos/${createdTodo.body.id}`)
                .send({
                title: 'Updated Todo',
                isCompleted: true,
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(createdTodo.body.id);
                expect(res.body.title).toBe('Updated Todo');
                expect(res.body.isCompleted).toBe(true);
            });
        });
        it('should update only title', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Original Todo',
                isCompleted: false,
            })
                .expect(201);
            return request(app.getHttpServer())
                .patch(`/todos/${createdTodo.body.id}`)
                .send({
                title: 'Updated Todo',
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(createdTodo.body.id);
                expect(res.body.title).toBe('Updated Todo');
                expect(res.body.isCompleted).toBe(false);
            });
        });
        it('should update only isCompleted', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Original Todo',
                isCompleted: false,
            })
                .expect(201);
            return request(app.getHttpServer())
                .patch(`/todos/${createdTodo.body.id}`)
                .send({
                isCompleted: true,
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(createdTodo.body.id);
                expect(res.body.title).toBe('Original Todo');
                expect(res.body.isCompleted).toBe(true);
            });
        });
        it('should return 404 for non-existent todo', () => {
            return request(app.getHttpServer())
                .patch('/todos/999')
                .send({
                title: 'Updated Todo',
            })
                .expect(404);
        });
        it('should validate id parameter', () => {
            return request(app.getHttpServer())
                .patch('/todos/invalid-id')
                .send({
                title: 'Updated Todo',
            })
                .expect(400);
        });
    });
    describe('/todos/:id (DELETE)', () => {
        it('should delete a todo', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Test Todo',
                isCompleted: false,
            })
                .expect(201);
            return request(app.getHttpServer())
                .delete(`/todos/${createdTodo.body.id}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(createdTodo.body.id);
                expect(res.body.title).toBe('Test Todo');
                expect(res.body.isCompleted).toBe(false);
            });
        });
        it('should return 404 for non-existent todo', () => {
            return request(app.getHttpServer())
                .delete('/todos/999')
                .expect(404);
        });
        it('should validate id parameter', () => {
            return request(app.getHttpServer())
                .delete('/todos/invalid-id')
                .expect(400);
        });
    });
    describe('Complete CRUD flow', () => {
        it('should perform complete CRUD operations', async () => {
            const createdTodo = await request(app.getHttpServer())
                .post('/todos')
                .send({
                title: 'Complete Flow Todo',
                isCompleted: false,
            })
                .expect(201);
            const todoId = createdTodo.body.id;
            await request(app.getHttpServer())
                .get(`/todos/${todoId}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(todoId);
                expect(res.body.title).toBe('Complete Flow Todo');
                expect(res.body.isCompleted).toBe(false);
            });
            await request(app.getHttpServer())
                .patch(`/todos/${todoId}`)
                .send({
                title: 'Updated Complete Flow Todo',
                isCompleted: true,
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.id).toBe(todoId);
                expect(res.body.title).toBe('Updated Complete Flow Todo');
                expect(res.body.isCompleted).toBe(true);
            });
            await request(app.getHttpServer())
                .get(`/todos/${todoId}`)
                .expect(200)
                .expect((res) => {
                expect(res.body.title).toBe('Updated Complete Flow Todo');
                expect(res.body.isCompleted).toBe(true);
            });
            await request(app.getHttpServer())
                .delete(`/todos/${todoId}`)
                .expect(200);
            await request(app.getHttpServer())
                .get(`/todos/${todoId}`)
                .expect(404);
        });
    });
});
//# sourceMappingURL=todos.integration.spec.js.map