import { Request, Response } from 'express';
import { TodoHandler } from '../handler';

// Mock request and response
const mockRequest = () => {
	const req: Partial<Request> = {};
	return req as Request;
};

const mockResponse = () => {
	const res: Partial<Response> = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	res.send = jest.fn().mockReturnValue(res);
	return res as Response;
};

describe('TodoHandler', () => {
  let todoHandler: TodoHandler;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    todoHandler = new TodoHandler();
    req = mockRequest();
    res = mockResponse();
  });

  describe('GetTodos', () => {
    it('should return all todos', () => {
      todoHandler.GetTodos(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('AddTodo', () => {
    it('should add a new todo', () => {
      const task = 'New Task';
      const completed = false;
      const expectedTodo = {
        id: expect.any(String),
        task,
        completed
      };
      req.body = {
        task,
        completed
      };

      todoHandler.AddTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedTodo);
    });
  });

  describe('UpdateTodo', () => {
    it('should update an existing todo', () => {
      const todoId = 'todo-id';
      const todo = { id: todoId, task: 'Old Task', completed: false };
      todoHandler.addTodo(todo);

      const updatedTask = 'Updated Task';
      const updatedCompleted = true;
      req.params = { id: todoId };
      req.body = { task: updatedTask, completed: updatedCompleted };

      todoHandler.UpdateTodo(req, res);

      expect(todo.task).toBe(updatedTask);
      expect(todo.completed).toBe(updatedCompleted);
      expect(res.json).toHaveBeenCalledWith(todo);
    });

    it('should return 404 if todo is not found', () => {
      req.params = { id: 'non-existent-id' };
      todoHandler.UpdateTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Todo Not found', code: 404 });
    });
  });

  describe('DeleteTodo', () => {
    it('should delete an existing todo', () => {
      const todoId = 'todo-id';
      const todo = {
        id: todoId,
        task: 'Test Task',
        completed: false
      };
      todoHandler.addTodo(todo);

      req.params = { id: todoId };
      todoHandler.DeleteTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if todo is not found', () => {
      req.params = { id: 'non-existent-id' };
      todoHandler.DeleteTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Todo Not found', code: 404 });
    });
  });
});
