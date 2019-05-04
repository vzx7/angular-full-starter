import { IFile } from '../interfaces/i.file';

export class FileDto implements IFile {
  id?: string;
  fileId: string;
  filepath: string;
  mimetype: string;
  encoding: string;
  filename: string;
}
