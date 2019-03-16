import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  id: String,
  name: String,
  createdAt: String,
  updatedAt: String,
  // TODO решить с юзер
  //users: String[],
});