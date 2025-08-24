"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const todos_controller_1 = require("../src/todos/todos.controller");
const todos_service_1 = require("../src/todos/todos.service");
const common_1 = require("@nestjs/common");
describe('TodosController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [todos_controller_1.TodosController],
            providers: [todos_service_1.TodosService],
        }).compile();
        controller = module.get(todos_controller_1.TodosController);
        service = module.get(todos_service_1.TodosService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should create a new todo', () => {
            const createTodoDto = {
                title: 'Test Todo',
                isCompleted: false,
            };
            const expectedResult = {
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            };
            jest.spyOn(service, 'create').mockReturnValue(expectedResult);
            const result = controller.create(createTodoDto);
            expect(service.create).toHaveBeenCalledWith(createTodoDto);
            expect(result).toEqual(expectedResult);
        });
        it('should create a todo with default isCompleted', () => {
            const createTodoDto = {
                title: 'Test Todo',
            };
            const expectedResult = {
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            };
            jest.spyOn(service, 'create').mockReturnValue(expectedResult);
            const result = controller.create(createTodoDto);
            expect(service.create).toHaveBeenCalledWith(createTodoDto);
            expect(result).toEqual(expectedResult);
        });
    });
    describe('findAll', () => {
        it('should return an empty array when no todos exist', () => {
            const expectedResult = [];
            jest.spyOn(service, 'findAll').mockReturnValue(expectedResult);
            const result = controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        });
        it('should return all todos', () => {
            const expectedResult = [
                { id: 1, title: 'First Todo', isCompleted: false },
                { id: 2, title: 'Second Todo', isCompleted: true },
            ];
            jest.spyOn(service, 'findAll').mockReturnValue(expectedResult);
            const result = controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        });
    });
    describe('findOne', () => {
        it('should return a todo by id', () => {
            const id = 1;
            const expectedResult = {
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            };
            jest.spyOn(service, 'findOne').mockReturnValue(expectedResult);
            const result = controller.findOne(id);
            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedResult);
        });
        it('should throw NotFoundException when todo does not exist', () => {
            const id = 999;
            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
            });
            expect(() => controller.findOne(id)).toThrow(common_1.NotFoundException);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });
    describe('update', () => {
        it('should update a todo', () => {
            const id = 1;
            const updateTodoDto = {
                title: 'Updated Todo',
                isCompleted: true,
            };
            const expectedResult = {
                id: 1,
                title: 'Updated Todo',
                isCompleted: true,
            };
            jest.spyOn(service, 'update').mockReturnValue(expectedResult);
            const result = controller.update(id, updateTodoDto);
            expect(service.update).toHaveBeenCalledWith(id, updateTodoDto);
            expect(result).toEqual(expectedResult);
        });
        it('should update only title', () => {
            const id = 1;
            const updateTodoDto = {
                title: 'Updated Todo',
            };
            const expectedResult = {
                id: 1,
                title: 'Updated Todo',
                isCompleted: false,
            };
            jest.spyOn(service, 'update').mockReturnValue(expectedResult);
            const result = controller.update(id, updateTodoDto);
            expect(service.update).toHaveBeenCalledWith(id, updateTodoDto);
            expect(result).toEqual(expectedResult);
        });
        it('should update only isCompleted', () => {
            const id = 1;
            const updateTodoDto = {
                isCompleted: true,
            };
            const expectedResult = {
                id: 1,
                title: 'Original Todo',
                isCompleted: true,
            };
            jest.spyOn(service, 'update').mockReturnValue(expectedResult);
            const result = controller.update(id, updateTodoDto);
            expect(service.update).toHaveBeenCalledWith(id, updateTodoDto);
            expect(result).toEqual(expectedResult);
        });
        it('should throw NotFoundException when todo does not exist', () => {
            const id = 999;
            const updateTodoDto = {
                title: 'Updated Todo',
            };
            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
            });
            expect(() => controller.update(id, updateTodoDto)).toThrow(common_1.NotFoundException);
            expect(service.update).toHaveBeenCalledWith(id, updateTodoDto);
        });
    });
    describe('remove', () => {
        it('should remove a todo', () => {
            const id = 1;
            const expectedResult = {
                id: 1,
                title: 'Test Todo',
                isCompleted: false,
            };
            jest.spyOn(service, 'remove').mockReturnValue(expectedResult);
            const result = controller.remove(id);
            expect(service.remove).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedResult);
        });
        it('should throw NotFoundException when todo does not exist', () => {
            const id = 999;
            jest.spyOn(service, 'remove').mockImplementation(() => {
                throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
            });
            expect(() => controller.remove(id)).toThrow(common_1.NotFoundException);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});
//# sourceMappingURL=todos.controller.spec.js.map