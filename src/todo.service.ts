import { Injectable, Logger, NotFoundException } from '@nestjs/common';

export type Todo = {
  id: number;
  item: string;
  isCompleted: boolean;
};

export type NewTodo = Omit<Todo, 'id' | 'isCompleted'>;

export type UpdateTodo = Partial<Omit<Todo, 'id'>>;

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, item: 'Todo 1', isCompleted: false },
    { id: 2, item: 'Todo 2', isCompleted: true },
    { id: 3, item: 'Todo 3', isCompleted: false },
  ];
  id = 3;

  private logger = new Logger(TodoService.name);

  getTodos(): Todo[] {
    this.logger.log('getTodos is called');

    return this.todos;
  }

  addTodo(newTodo: NewTodo): Todo {
    this.logger.log('addTodo is called');

    this.id = this.id + 1;
    const newTodoWithId: Todo = {
      id: this.id,
      ...newTodo,
      isCompleted: false,
    };
    this.todos = [...this.todos, newTodoWithId];
    return newTodoWithId;
  }

  getTodo(id: number): Todo {
    this.logger.log('getTodo is called');

    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      this.logger.error(`Todo ${id} does not exist`);
      throw new NotFoundException(`Todo ${id} does not exist`);
    }

    return todo;
  }

  updateTodo(id: number, dto: UpdateTodo): Todo | undefined {
    this.logger.log('updateTodo is called');

    this.todos = this.todos.map((todo) =>
      todo.id === id ? { id, item: todo.item, isCompleted: todo.isCompleted, ...dto } : todo,
    );

    return this.getTodo(id);
  }

  deleteTodo(id: number): void {
    this.logger.log('deleteTodo is called');

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  countTodos(): { total: number; completed: number; pending: number } {
    this.logger.log('countTodos is called');

    return this.todos.reduce(
      (acc, todo) => ({
        total: acc.total + 1,
        completed: acc.completed + (todo.isCompleted ? 1 : 0),
        pending: acc.pending + (todo.isCompleted ? 0 : 1),
      }),
      { total: 0, completed: 0, pending: 0 },
    );
  }
}
