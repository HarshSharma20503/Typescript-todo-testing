import { Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { TodoService } from '../services/TodoService';
import { AuthRequest } from '../middleware/auth';
import { TodoStatus } from '../types';

export class TodoController extends BaseController<TodoService> {
  constructor() {
    super(new TodoService());
  }

  createTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      const todoData = { ...req.body, userId: req.userId };
      return this.service.create(todoData);
    });
  };

  getTodos = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.findUserTodos(req.userId!);
    });
  };

  getTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.findOne({ _id: req.params.id, userId: req.userId });
    });
  };

  updateTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.update(req.params.id, { ...req.body, userId: req.userId });
    });
  };

  deleteTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      await this.service.delete(req.params.id);
      return { message: 'Todo deleted successfully' };
    });
  };

  updateStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.updateStatus(req.params.id, req.body.status as TodoStatus, req.userId!);
    });
  };

  addTags = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.addTags(req.params.id, req.body.tags, req.userId!);
    });
  };

  removeTags = async (req: AuthRequest, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.removeTags(req.params.id, req.body.tags, req.userId!);
    });
  };
}
