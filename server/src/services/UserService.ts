import { BaseService } from './BaseService';
import { User } from '../models/User';
import { IUser } from '../types';
import { ValidationError } from '../utils/errors';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }

  async register(userData: Partial<IUser>): Promise<{ user: IUser; token: string }> {
    const existingUser = await this.findOne({ email: userData.email });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const user = await this.create(userData);
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.model.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ValidationError('Invalid credentials');
    }

    const token = this.generateToken(user._id);
    return { user, token };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiration });
  }
}
