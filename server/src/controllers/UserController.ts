import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';

export class UserController extends BaseController<UserService> {
  constructor() {
    super(new UserService());
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      return this.service.register(req.body);
    });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      const { email, password } = req.body;
      return this.service.login(email, password);
    });
  };
}
