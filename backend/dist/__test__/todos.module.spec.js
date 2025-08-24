"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const todos_module_1 = require("../src/todos/todos.module");
const todos_controller_1 = require("../src/todos/todos.controller");
const todos_service_1 = require("../src/todos/todos.service");
describe('TodosModule', () => {
    let module;
    beforeEach(async () => {
        module = await testing_1.Test.createTestingModule({
            imports: [todos_module_1.TodosModule],
        }).compile();
    });
    it('should be defined', () => {
        expect(module).toBeDefined();
    });
    it('should provide TodosController', () => {
        const controller = module.get(todos_controller_1.TodosController);
        expect(controller).toBeDefined();
    });
    it('should provide TodosService', () => {
        const service = module.get(todos_service_1.TodosService);
        expect(service).toBeDefined();
    });
    it('should inject TodosService into TodosController', () => {
        const controller = module.get(todos_controller_1.TodosController);
        const service = module.get(todos_service_1.TodosService);
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=todos.module.spec.js.map