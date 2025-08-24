import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private nextId = 1;

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted || false,
    };
    
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    const todo = this.todos[todoIndex];
    this.todos[todoIndex] = {
      ...todo,
      ...updateTodoDto,
    };

    return this.todos[todoIndex];
  }

  remove(id: number): Todo {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    const removedTodo = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    
    return removedTodo;
  }
}
