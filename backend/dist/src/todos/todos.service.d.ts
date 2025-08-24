import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosService {
    private todos;
    private nextId;
    create(createTodoDto: CreateTodoDto): Todo;
    findAll(): Todo[];
    findOne(id: number): Todo;
    update(id: number, updateTodoDto: UpdateTodoDto): Todo;
    remove(id: number): Todo;
}
