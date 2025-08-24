"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
let TodosService = class TodosService {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    create(createTodoDto) {
        const todo = {
            id: this.nextId++,
            title: createTodoDto.title,
            isCompleted: createTodoDto.isCompleted || false,
        };
        this.todos.push(todo);
        return todo;
    }
    findAll() {
        return this.todos;
    }
    findOne(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
        }
        return todo;
    }
    update(id, updateTodoDto) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
        }
        const todo = this.todos[todoIndex];
        this.todos[todoIndex] = Object.assign(Object.assign({}, todo), updateTodoDto);
        return this.todos[todoIndex];
    }
    remove(id) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
        }
        const removedTodo = this.todos[todoIndex];
        this.todos.splice(todoIndex, 1);
        return removedTodo;
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
//# sourceMappingURL=todos.service.js.map