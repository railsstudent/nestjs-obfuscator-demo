import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NewTodo, Todo, TodoService, UpdateTodo } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  @Get('count')
  countTodos(): { total: number; completed: number; pending: number } {
    return this.todoService.countTodos();
  }

  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.getTodo(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): void {
    return this.todoService.deleteTodo(id);
  }

  @Post()
  addTodo(@Body() dto: NewTodo): Todo {
    return this.todoService.addTodo(dto);
  }

  @Put(':id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodo): Todo {
    return this.todoService.updateTodo(id, dto);
  }
}
