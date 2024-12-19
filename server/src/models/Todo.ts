import mongoose, { Schema, Document } from 'mongoose';
import { ITodo, TodoStatus } from '../types';

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
    dueDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
        validate: {
          validator: function (value: string) {
            return this.tags.filter((tag: string) => tag === value).length === 1;
          },
          message: 'Tags must be unique',
        },
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

// Move the validation logic to pre-save middleware
todoSchema.pre('save', function (next) {
  // Check if document is new or dueDate is modified
  if ((this.isNew || this.modifiedPaths().includes('dueDate')) && this.dueDate) {
    if (this.dueDate < new Date()) {
      const error = new Error('Due date must be after creation date');
      return next(error);
    }
  }

  // Update status to OVERDUE if applicable
  if (this.dueDate && this.dueDate < new Date() && this.status !== TodoStatus.COMPLETED) {
    this.status = TodoStatus.OVERDUE;
  }

  next();
});

// Index for faster queries
todoSchema.index({ userId: 1, status: 1 });
todoSchema.index({ userId: 1, dueDate: 1 });

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
