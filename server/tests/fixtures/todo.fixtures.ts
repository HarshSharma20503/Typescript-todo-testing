import { ITodo } from '../../src/types';

export const createMockTodo = (userId: string, overrides = {}): Partial<ITodo> => ({
  userId,
  title: 'Test Todo',
  description: 'Test Description',
  ...overrides,
});
