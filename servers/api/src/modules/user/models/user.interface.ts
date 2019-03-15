import { Document } from 'mongoose';

export interface User extends Document {
  readonly id?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly createdAt: string;
}