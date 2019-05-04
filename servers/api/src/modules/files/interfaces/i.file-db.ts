import { Document } from 'mongoose';

export interface IFileDb extends Document {
  readonly id: string;
  readonly fileId: string;
  readonly filepath: string;
  readonly mimetype: string;
  readonly encoding: string;
  readonly filename: string;
}
