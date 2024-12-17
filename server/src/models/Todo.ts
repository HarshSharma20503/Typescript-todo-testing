import mongoose, { Schema, Document } from 'mongoose';
import { ITodo, TodoStatus } from '../types';

// interface ITodoDocument extends Omit<ITodo, '_id'>, Document {}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: (value: Date) => {
          return !value || value > new Date();
        },
        message: 'Due date must be after creation date',
      },
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: Object.values(TodoStatus),
      default: TodoStatus.OPEN,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
todoSchema.index({ userId: 1, status: 1 });
todoSchema.index({ userId: 1, dueDate: 1 });

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
