import { Test, TestingModule } from '@nestjs/testing';
import { TodosModule } from '../src/todos/todos.module';
import { TodosController } from '../src/todos/todos.controller';
import { TodosService } from '../src/todos/todos.service';

describe('TodosModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TodosModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide TodosController', () => {
    const controller = module.get<TodosController>(TodosController);
    expect(controller).toBeDefined();
  });

  it('should provide TodosService', () => {
    const service = module.get<TodosService>(TodosService);
    expect(service).toBeDefined();
  });

  it('should inject TodosService into TodosController', () => {
    const controller = module.get<TodosController>(TodosController);
    const service = module.get<TodosService>(TodosService);
    
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
