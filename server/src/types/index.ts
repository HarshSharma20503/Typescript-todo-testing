export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  timestamp: Date;
  dueDate?: Date;
  tags: string[];
  status: TodoStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  WORKING = 'WORKING',
  PENDING_REVIEW = 'PENDING_REVIEW',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}
