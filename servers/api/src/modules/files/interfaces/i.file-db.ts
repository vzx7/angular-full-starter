import { Document } from 'mongoose';

export interface IFileDb extends Document {
  readonly filepath: string;
  readonly mimetype: string;
  readonly encoding: string;
  readonly filename: string;
}
