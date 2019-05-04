export interface IFileStream {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: any;
}
