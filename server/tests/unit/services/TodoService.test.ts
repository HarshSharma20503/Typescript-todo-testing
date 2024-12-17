import { TodoService } from '../../../src/services/TodoService';
import { createMockTodo } from '../../fixtures/todo.fixtures';
import { TodoStatus } from '../../../src/types';
import mongoose from 'mongoose';
import { describe, expect, it } from '@jest/globals';

describe('TodoService', () => {
  const todoService = new TodoService();
  const userId = new mongoose.Types.ObjectId().toString();

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const mockTodo = createMockTodo(userId);
      const todo = await todoService.create(mockTodo);

      expect(todo).toHaveProperty('_id');
      expect(todo.title).toBe(mockTodo.title);
      expect(todo.userId).toBe(userId);
    });

    it('should validate required fields', async () => {
      const invalidTodo = { userId };
      await expect(todoService.create(invalidTodo)).rejects.toThrow();
    });
  });

  describe('updateStatus', () => {
    it('should update todo status', async () => {
      const todo = await todoService.create(createMockTodo(userId));
      const updated = await todoService.updateStatus(todo._id, TodoStatus.WORKING, userId);

      expect(updated.status).toBe(TodoStatus.WORKING);
    });

    it('should mark as overdue if completed after due date', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const todo = await todoService.create(createMockTodo(userId, { dueDate: pastDate }));

      const updated = await todoService.updateStatus(todo._id, TodoStatus.COMPLETED, userId);

      expect(updated.status).toBe(TodoStatus.OVERDUE);
    });
  });
});
