import { BaseService } from './BaseService';
import { Todo } from '../models/Todo';
import { ITodo, TodoStatus } from '../types';
import { NotFoundError } from '../utils/errors';

export class TodoService extends BaseService<ITodo> {
  constructor() {
    super(Todo);
  }

  async findUserTodos(userId: string, filters: any = {}): Promise<ITodo[]> {
    const query = { userId, ...filters };
    return this.model.find(query).sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: TodoStatus, userId: string): Promise<ITodo> {
    const todo = await this.model.findOne({ _id: id, userId });
    if (!todo) throw new NotFoundError('Todo not found');

    todo.status = status;

    return todo.save();
  }

  async addTags(id: string, tags: string[], userId: string): Promise<ITodo> {
    const todo = await this.model.findOne({ _id: id, userId });
    if (!todo) throw new NotFoundError('Todo not found');

    const uniqueTags = [...new Set([...todo.tags, ...tags])];
    todo.tags = uniqueTags;
    return todo.save();
  }

  async removeTags(id: string, tags: string[], userId: string): Promise<ITodo> {
    const todo = await this.model.findOne({ _id: id, userId });
    if (!todo) throw new NotFoundError('Todo not found');

    todo.tags = todo.tags.filter((tag: string) => !tags.includes(tag));
    return todo.save();
  }
}
