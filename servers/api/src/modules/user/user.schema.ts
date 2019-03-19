import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  login: String,
  email: String,
  token: String,
  role: String
});
