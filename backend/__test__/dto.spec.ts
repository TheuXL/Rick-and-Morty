import { validate } from 'class-validator';
import { CreateTodoDto } from '../src/todos/dto/create-todo.dto';
import { UpdateTodoDto } from '../src/todos/dto/update-todo.dto';

describe('DTOs', () => {
  describe('CreateTodoDto', () => {
    it('should pass validation with valid data', async () => {
      const dto = new CreateTodoDto();
      dto.title = 'Valid Todo';
      dto.isCompleted = false;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with only title', async () => {
      const dto = new CreateTodoDto();
      dto.title = 'Valid Todo';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when title is empty', async () => {
      const dto = new CreateTodoDto();
      dto.title = '';
      dto.isCompleted = false;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotEmpty).toBeDefined();
    });

    it('should fail validation when title is missing', async () => {
      const dto = new CreateTodoDto();
      dto.isCompleted = false;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotEmpty).toBeDefined();
    });

    it('should fail validation when title is not a string', async () => {
      const dto = new CreateTodoDto();
      (dto as any).title = 123;
      dto.isCompleted = false;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should pass validation with boolean isCompleted', async () => {
      const dto = new CreateTodoDto();
      dto.title = 'Valid Todo';
      dto.isCompleted = true;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when isCompleted is not a boolean', async () => {
      const dto = new CreateTodoDto();
      dto.title = 'Valid Todo';
      (dto as any).isCompleted = 'not-a-boolean';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isBoolean).toBeDefined();
    });
  });

  describe('UpdateTodoDto', () => {
    it('should pass validation with valid title', async () => {
      const dto = new UpdateTodoDto();
      dto.title = 'Updated Todo';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with valid isCompleted', async () => {
      const dto = new UpdateTodoDto();
      dto.isCompleted = true;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with both fields', async () => {
      const dto = new UpdateTodoDto();
      dto.title = 'Updated Todo';
      dto.isCompleted = true;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with empty object (all fields optional)', async () => {
      const dto = new UpdateTodoDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when title is empty string', async () => {
      const dto = new UpdateTodoDto();
      dto.title = '';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotEmpty).toBeDefined();
    });

    it('should fail validation when title is not a string', async () => {
      const dto = new UpdateTodoDto();
      (dto as any).title = 123;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail validation when isCompleted is not a boolean', async () => {
      const dto = new UpdateTodoDto();
      (dto as any).isCompleted = 'not-a-boolean';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isBoolean).toBeDefined();
    });
  });
});
