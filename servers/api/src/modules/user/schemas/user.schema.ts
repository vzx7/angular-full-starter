import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  email: String,
  type: Number,
  token: String
});
