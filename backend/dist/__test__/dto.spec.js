"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const create_todo_dto_1 = require("../src/todos/dto/create-todo.dto");
const update_todo_dto_1 = require("../src/todos/dto/update-todo.dto");
describe('DTOs', () => {
    describe('CreateTodoDto', () => {
        it('should pass validation with valid data', async () => {
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = 'Valid Todo';
            dto.isCompleted = false;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should pass validation with only title', async () => {
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = 'Valid Todo';
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation when title is empty', async () => {
            var _a;
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = '';
            dto.isCompleted = false;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isNotEmpty).toBeDefined();
        });
        it('should fail validation when title is missing', async () => {
            var _a;
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.isCompleted = false;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isNotEmpty).toBeDefined();
        });
        it('should fail validation when title is not a string', async () => {
            var _a;
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = 123;
            dto.isCompleted = false;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isString).toBeDefined();
        });
        it('should pass validation with boolean isCompleted', async () => {
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = 'Valid Todo';
            dto.isCompleted = true;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation when isCompleted is not a boolean', async () => {
            var _a;
            const dto = new create_todo_dto_1.CreateTodoDto();
            dto.title = 'Valid Todo';
            dto.isCompleted = 'not-a-boolean';
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isBoolean).toBeDefined();
        });
    });
    describe('UpdateTodoDto', () => {
        it('should pass validation with valid title', async () => {
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.title = 'Updated Todo';
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should pass validation with valid isCompleted', async () => {
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.isCompleted = true;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should pass validation with both fields', async () => {
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.title = 'Updated Todo';
            dto.isCompleted = true;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should pass validation with empty object (all fields optional)', async () => {
            const dto = new update_todo_dto_1.UpdateTodoDto();
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation when title is empty string', async () => {
            var _a;
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.title = '';
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isNotEmpty).toBeDefined();
        });
        it('should fail validation when title is not a string', async () => {
            var _a;
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.title = 123;
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isString).toBeDefined();
        });
        it('should fail validation when isCompleted is not a boolean', async () => {
            var _a;
            const dto = new update_todo_dto_1.UpdateTodoDto();
            dto.isCompleted = 'not-a-boolean';
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect((_a = errors[0].constraints) === null || _a === void 0 ? void 0 : _a.isBoolean).toBeDefined();
        });
    });
});
//# sourceMappingURL=dto.spec.js.map