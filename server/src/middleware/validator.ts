import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';
import { TodoStatus } from '../types';

const todoSchema = {
  create: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must not exceed 100 characters'),
    description: z.string().min(1, 'Description is required').max(1000, 'Description must not exceed 1000 characters'),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    status: z.nativeEnum(TodoStatus).optional(),
  }),

  update: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must not exceed 100 characters').optional(),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(1000, 'Description must not exceed 1000 characters')
      .optional(),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    status: z.nativeEnum(TodoStatus).optional(),
  }),
};

export const validateSchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError(error.errors[0].message));
      }
      next(error);
    }
  };
};

export const validateTodoCreate = validateSchema(todoSchema.create);
export const validateTodoUpdate = validateSchema(todoSchema.update);
