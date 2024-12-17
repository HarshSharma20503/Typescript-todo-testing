import { IUser } from '../../src/types';

export const createMockUser = (overrides = {}): Partial<IUser> => ({
  email: 'test@example.com',
  password: 'password',
  name: 'Test User',
  ...overrides,
});
