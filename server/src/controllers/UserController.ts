import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';

export class UserController extends BaseController<UserService> {
  constructor() {
    super(new UserService());
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      const { user, token } = await this.service.register(req.body);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });
      return {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    this.handleRequest(req, res, next, async () => {
      const { email, password } = req.body;
      const { user, token } = await this.service.login(email, password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });
      return {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    });
  };
}
