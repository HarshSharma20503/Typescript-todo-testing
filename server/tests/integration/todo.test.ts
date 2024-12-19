import request from 'supertest';
import app from '../../src/app';
import { createMockTodo } from '../fixtures/todo.fixtures';
import { createMockUser } from '../fixtures/user.fixtures';
import { TodoStatus } from '../../src/types';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('Todo API Integration', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Setup: Create user and get auth token
    const mockUser = createMockUser();
    const response = await request(app).post('/api/users/register').send(mockUser);

    authToken = response.body.data.token;
    userId = response.body.data.user._id;
  });

  describe('POST /api/todos', () => {
    it('should create todo with valid data', async () => {
      const mockTodo = createMockTodo(userId);
      const response = await request(app).post('/api/todos').set('Authorization', `Bearer ${authToken}`).send(mockTodo);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(mockTodo.title);
    });

    it('should validate required fields', async () => {
      const response = await request(app).post('/api/todos').set('Authorization', `Bearer ${authToken}`).send({});

      expect(response.status).toBe(400);
    });

    it('should require authentication', async () => {
      const mockTodo = createMockTodo(userId);
      const response = await request(app).post('/api/todos').send(mockTodo);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/todos', () => {
    beforeEach(async () => {
      // Create test todos
      const todos = [createMockTodo(userId), createMockTodo(userId), createMockTodo(userId)];

      await Promise.all(
        todos.map((todo) => request(app).post('/api/todos').set('Authorization', `Bearer ${authToken}`).send(todo))
      );
    });

    it('should get all user todos', async () => {
      const response = await request(app).get('/api/todos').set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
    });

    it('should filter by status', async () => {
      const response = await request(app)
        .get('/api/todos')
        .query({ status: TodoStatus.OPEN })
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.every((todo: any) => todo.status === TodoStatus.OPEN)).toBe(true);
    });
  });
});
