import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _Id: mongoose.Types.ObjectId,
  firstName: String,
  lastName: String,
  login: String,
  email: String,
  password: String
});
