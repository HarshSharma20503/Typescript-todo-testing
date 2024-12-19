import { TodoService } from '../../../src/services/TodoService';
import { createMockTodo } from '../../fixtures/todo.fixtures';
import { TodoStatus } from '../../../src/types';
import mongoose from 'mongoose';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { NotFoundError } from '../../../src/utils/errors';
import { jest } from '@jest/globals';

describe('TodoService', () => {
  let todoService: TodoService;
  let userId: string;

  beforeEach(() => {
    todoService = new TodoService();
    userId = new mongoose.Types.ObjectId().toString();
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const mockTodo = createMockTodo(userId);
      const todo = await todoService.create(mockTodo);

      expect(todo).toHaveProperty('_id');
      expect(todo.title).toBe(mockTodo.title);
      expect(todo.userId.toString()).toEqual(userId);
    });

    it('should validate required fields', async () => {
      const invalidTodo = { userId };
      await expect(todoService.create(invalidTodo)).rejects.toThrow();
    });
  });

  describe('findUserTodos', () => {
    it('should return todos for specific user', async () => {
      const mockTodo1 = await todoService.create(createMockTodo(userId));
      const mockTodo2 = await todoService.create(createMockTodo(userId));
      const anotherUserId = new mongoose.Types.ObjectId().toString();
      await todoService.create(createMockTodo(anotherUserId));

      const userTodos = await todoService.findUserTodos(userId);

      expect(userTodos).toHaveLength(2);
      expect(userTodos.map((todo) => todo._id.toString())).toEqual(
        expect.arrayContaining([mockTodo1._id.toString(), mockTodo2._id.toString()])
      );
    });

    it('should filter todos based on provided filters', async () => {
      await todoService.create({ ...createMockTodo(userId), status: TodoStatus.PENDING_REVIEW });
      await todoService.create({ ...createMockTodo(userId), status: TodoStatus.WORKING });

      const filteredTodos = await todoService.findUserTodos(userId, { status: TodoStatus.PENDING_REVIEW });

      expect(filteredTodos).toHaveLength(1);
      expect(filteredTodos[0].status).toBe(TodoStatus.PENDING_REVIEW);
    });
  });

  describe('updateStatus', () => {
    it('should update todo status', async () => {
      const todo = await todoService.create(createMockTodo(userId));
      const updated = await todoService.updateStatus(todo._id, TodoStatus.WORKING, userId);

      expect(updated.status).toBe(TodoStatus.WORKING);
    });

    it('should throw NotFoundError for non-existent todo', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      await expect(todoService.updateStatus(nonExistentId, TodoStatus.WORKING, userId)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when updating todo from different user', async () => {
      const todo = await todoService.create(createMockTodo(userId));
      const differentUserId = new mongoose.Types.ObjectId().toString();

      await expect(todoService.updateStatus(todo._id, TodoStatus.WORKING, differentUserId)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('addTags', () => {
    it('should add new tags to todo', async () => {
      const todo = await todoService.create({
        ...createMockTodo(userId),
        tags: ['initial'],
      });

      const updated = await todoService.addTags(todo._id, ['new1', 'new2'], userId);

      expect(updated.tags).toHaveLength(3);
      expect(updated.tags).toEqual(expect.arrayContaining(['initial', 'new1', 'new2']));
    });

    it('should not add duplicate tags', async () => {
      const todo = await todoService.create({
        ...createMockTodo(userId),
        tags: ['tag1'],
      });

      const updated = await todoService.addTags(todo._id, ['tag1', 'tag2'], userId);

      expect(updated.tags).toHaveLength(2);
      expect(updated.tags).toEqual(expect.arrayContaining(['tag1', 'tag2']));
    });

    it('should throw NotFoundError for non-existent todo', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      await expect(todoService.addTags(nonExistentId, ['tag1'], userId)).rejects.toThrow(NotFoundError);
    });
  });

  describe('removeTags', () => {
    it('should remove specified tags from todo', async () => {
      const todo = await todoService.create({
        ...createMockTodo(userId),
        tags: ['tag1', 'tag2', 'tag3'],
      });

      const updated = await todoService.removeTags(todo._id, ['tag1', 'tag2'], userId);

      expect(updated.tags).toHaveLength(1);
      expect(updated.tags).toEqual(['tag3']);
    });

    it('should handle removing non-existent tags', async () => {
      const todo = await todoService.create({
        ...createMockTodo(userId),
        tags: ['tag1'],
      });

      const updated = await todoService.removeTags(todo._id, ['tag2'], userId);

      expect(updated.tags).toHaveLength(1);
      expect(updated.tags).toEqual(['tag1']);
    });

    it('should throw NotFoundError for non-existent todo', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      await expect(todoService.removeTags(nonExistentId, ['tag1'], userId)).rejects.toThrow(NotFoundError);
    });
  });
});
