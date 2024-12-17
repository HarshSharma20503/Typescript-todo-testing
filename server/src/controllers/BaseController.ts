import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/BaseService';
import { successResponse } from '../utils/response';

export class BaseController<T> {
  protected service: T;

  constructor(service: T) {
    this.service = service;
  }

  protected async handleRequest(req: Request, res: Response, next: NextFunction, callback: () => Promise<any>) {
    try {
      const result = await callback();
      return res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}
