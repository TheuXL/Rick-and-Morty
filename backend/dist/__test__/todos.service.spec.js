"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const todos_service_1 = require("../src/todos/todos.service");
describe('TodosService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [todos_service_1.TodosService],
        }).compile();
        service = module.get(todos_service_1.TodosService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new todo', () => {
            const createTodoDto = {
                title: 'Test Todo',
                isCompleted: false,
            };
            const result = service.create(createTodoDto);
            expect(result).toEqual({
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            });
        });
        it('should create a todo with default isCompleted as false', () => {
            const createTodoDto = {
                title: 'Test Todo',
            };
            const result = service.create(createTodoDto);
            expect(result).toEqual({
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            });
        });
        it('should increment id for each new todo', () => {
            const createTodoDto1 = {
                title: 'First Todo',
            };
            const createTodoDto2 = {
                title: 'Second Todo',
            };
            const result1 = service.create(createTodoDto1);
            const result2 = service.create(createTodoDto2);
            expect(result1.id).toBe(1);
            expect(result2.id).toBe(2);
        });
    });
    describe('findAll', () => {
        it('should return an empty array when no todos exist', () => {
            const result = service.findAll();
            expect(result).toEqual([]);
        });
        it('should return all todos', () => {
            const createTodoDto1 = {
                title: 'First Todo',
            };
            const createTodoDto2 = {
                title: 'Second Todo',
            };
            service.create(createTodoDto1);
            service.create(createTodoDto2);
            const result = service.findAll();
            expect(result).toHaveLength(2);
            expect(result[0].title).toBe('First Todo');
            expect(result[1].title).toBe('Second Todo');
        });
    });
    describe('findOne', () => {
        it('should return a todo by id', () => {
            const createTodoDto = {
                title: 'Test Todo',
            };
            const createdTodo = service.create(createTodoDto);
            const result = service.findOne(createdTodo.id);
            expect(result).toEqual(createdTodo);
        });
        it('should throw NotFoundException when todo does not exist', () => {
            expect(() => service.findOne(999)).toThrow(common_1.NotFoundException);
            expect(() => service.findOne(999)).toThrow('Tarefa com ID 999 não encontrada');
        });
    });
    describe('update', () => {
        it('should update a todo', () => {
            const createTodoDto = {
                title: 'Original Todo',
                isCompleted: false,
            };
            const createdTodo = service.create(createTodoDto);
            const updateTodoDto = {
                title: 'Updated Todo',
                isCompleted: true,
            };
            const result = service.update(createdTodo.id, updateTodoDto);
            expect(result).toEqual({
                id: createdTodo.id,
                title: 'Updated Todo',
                isCompleted: true,
            });
        });
        it('should update only title when only title is provided', () => {
            const createTodoDto = {
                title: 'Original Todo',
                isCompleted: false,
            };
            const createdTodo = service.create(createTodoDto);
            const updateTodoDto = {
                title: 'Updated Todo',
            };
            const result = service.update(createdTodo.id, updateTodoDto);
            expect(result).toEqual({
                id: createdTodo.id,
                title: 'Updated Todo',
                isCompleted: false,
            });
        });
        it('should update only isCompleted when only isCompleted is provided', () => {
            const createTodoDto = {
                title: 'Original Todo',
                isCompleted: false,
            };
            const createdTodo = service.create(createTodoDto);
            const updateTodoDto = {
                isCompleted: true,
            };
            const result = service.update(createdTodo.id, updateTodoDto);
            expect(result).toEqual({
                id: createdTodo.id,
                title: 'Original Todo',
                isCompleted: true,
            });
        });
        it('should throw NotFoundException when todo does not exist', () => {
            const updateTodoDto = {
                title: 'Updated Todo',
            };
            expect(() => service.update(999, updateTodoDto)).toThrow(common_1.NotFoundException);
            expect(() => service.update(999, updateTodoDto)).toThrow('Tarefa com ID 999 não encontrada');
        });
    });
    describe('remove', () => {
        it('should remove a todo', () => {
            const createTodoDto = {
                title: 'Test Todo',
            };
            const createdTodo = service.create(createTodoDto);
            const result = service.remove(createdTodo.id);
            expect(result).toEqual(createdTodo);
            expect(service.findAll()).toHaveLength(0);
        });
        it('should throw NotFoundException when todo does not exist', () => {
            expect(() => service.remove(999)).toThrow(common_1.NotFoundException);
            expect(() => service.remove(999)).toThrow('Tarefa com ID 999 não encontrada');
        });
        it('should return the removed todo', () => {
            const createTodoDto = {
                title: 'Test Todo',
                isCompleted: true,
            };
            const createdTodo = service.create(createTodoDto);
            const removedTodo = service.remove(createdTodo.id);
            expect(removedTodo).toEqual({
                id: createdTodo.id,
                title: 'Test Todo',
                isCompleted: true,
            });
        });
    });
});
//# sourceMappingURL=todos.service.spec.js.map