import { Request, Response, NextFunction } from 'express';
import { Todo } from './types/todo';
import { v4 as uuidv4 } from 'uuid';

export class TodoHandler {
  // Simple in-memory store for Todo
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  public GetTodos = (req: Request, res: Response) => {
    res.status(200).json(this.todos);
  };

  public AddTodo = (req: Request, res: Response) => {
    const todo: Todo = {
      id: uuidv4(),
      task: req.body.task,
      completed: req.body.completed || false,
    };
    this.todos.push(todo);
    res.status(201).json(todo);
  };

  // This method is used for testing
  public addTodo = (todo: Todo) => {
    this.todos.push(todo);
  };

  public UpdateTodo = (req: Request, res: Response) => {
    const todo = this.todos.find((t) => t.id === req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo Not found', code: 404 });
    }
    todo.task = req.body.task!; // non-null assertion operator: must be not null or undefined
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  };

  public DeleteTodo = (req: Request, res: Response) => {
    const index = this.todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Todo Not found', code: 404 });
    }
    this.todos.splice(index, 1);
    res.status(204).send();
  };
}
