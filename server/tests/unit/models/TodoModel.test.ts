import { TodoService } from '../../../src/services/TodoService';
import { createMockTodo } from '../../fixtures/todo.fixtures';
import { TodoStatus } from '../../../src/types';
import { NotFoundError } from '../../../src/utils/errors';
import { describe, expect, it, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';

describe('TodoService', () => {
  const todoService = new TodoService();
  const userId = new mongoose.Types.ObjectId().toString();

  describe('createTodo', () => {
    it('should create todo with valid data', async () => {
      const mockTodo = createMockTodo(userId);
      const todo = await todoService.create(mockTodo);

      expect(todo._id).toBeDefined();
      expect(todo.title).toBe(mockTodo.title);
    });

    it('should throw error for duplicate tags', async () => {
      const mockTodo = createMockTodo(userId, {
        tags: ['tag1', 'tag1', 'tag2'],
      });

      await expect(todoService.create(mockTodo)).rejects.toThrow('Tags must be unique');
    });
  });

  describe('findUserTodos', () => {
    beforeEach(async () => {
      // Create test todos
      const todos = [
        createMockTodo(userId, { status: TodoStatus.OPEN }),
        createMockTodo(userId, { status: TodoStatus.WORKING }),
        createMockTodo(userId, { status: TodoStatus.COMPLETED }),
      ];
      await Promise.all(todos.map((todo) => todoService.create(todo)));
    });

    it('should find all user todos', async () => {
      const todos = await todoService.findUserTodos(userId);
      expect(todos).toHaveLength(3);
    });

    it('should filter by status', async () => {
      const todos = await todoService.findUserTodos(userId, { status: TodoStatus.OPEN });
      expect(todos).toHaveLength(1);
      expect(todos[0].status).toBe(TodoStatus.OPEN);
    });
  });

  describe('updateStatus', () => {
    it('should update status', async () => {
      const todo = await todoService.create(createMockTodo(userId));
      const updated = await todoService.updateStatus(todo._id, TodoStatus.WORKING, userId);

      expect(updated.status).toBe(TodoStatus.WORKING);
    });

    it('should not update non-existent todo', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      await expect(todoService.updateStatus(fakeId, TodoStatus.WORKING, userId)).rejects.toThrow(NotFoundError);
    });
  });
});
