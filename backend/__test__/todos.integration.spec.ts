import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Todos (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Aplicar ValidationPipe global para os testes
    app.useGlobalPipes(new ValidationPipe({
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
      // Create first todo
      const todo1 = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'First Todo',
          isCompleted: false,
        })
        .expect(201);

      // Create second todo
      const todo2 = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Second Todo',
          isCompleted: true,
        })
        .expect(201);

      // Get all todos
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
      // Create a todo
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Test Todo',
          isCompleted: false,
        })
        .expect(201);

      // Get the todo by id
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
      // Create a todo
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Original Todo',
          isCompleted: false,
        })
        .expect(201);

      // Update the todo
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
      // Create a todo
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Original Todo',
          isCompleted: false,
        })
        .expect(201);

      // Update only title
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
      // Create a todo
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Original Todo',
          isCompleted: false,
        })
        .expect(201);

      // Update only isCompleted
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
      // Create a todo
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Test Todo',
          isCompleted: false,
        })
        .expect(201);

      // Delete the todo
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
      // Create
      const createdTodo = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'Complete Flow Todo',
          isCompleted: false,
        })
        .expect(201);

      const todoId = createdTodo.body.id;

      // Read
      await request(app.getHttpServer())
        .get(`/todos/${todoId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(todoId);
          expect(res.body.title).toBe('Complete Flow Todo');
          expect(res.body.isCompleted).toBe(false);
        });

      // Update
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

      // Verify update
      await request(app.getHttpServer())
        .get(`/todos/${todoId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Updated Complete Flow Todo');
          expect(res.body.isCompleted).toBe(true);
        });

      // Delete
      await request(app.getHttpServer())
        .delete(`/todos/${todoId}`)
        .expect(200);

      // Verify deletion
      await request(app.getHttpServer())
        .get(`/todos/${todoId}`)
        .expect(404);
    });
  });
});
