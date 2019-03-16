import { Document } from 'mongoose';

export interface Role extends Document {
  readonly id?: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}