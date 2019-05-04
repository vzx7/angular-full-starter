import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  _Id: mongoose.Types.ObjectId,
  fileId: String,
  filepath: String,
  mimetype: String,
  encoding: String,
  filename: String,
});
