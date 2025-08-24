import { Module } from '@nestjs/common';
import { TodosModule } from '../src/todos/todos.module';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
