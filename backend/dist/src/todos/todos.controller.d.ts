import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto): Todo;
    findAll(): Todo[];
    findOne(id: number): Todo;
    update(id: number, updateTodoDto: UpdateTodoDto): Todo;
    remove(id: number): Todo;
}
