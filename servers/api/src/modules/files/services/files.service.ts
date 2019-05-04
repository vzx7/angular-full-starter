import { Model } from 'mongoose';
import { logger } from '../../../utils/utils';

import { Inject, Injectable } from '@nestjs/common';

import { IFile } from '../interfaces/i.file';
import { IFileDb } from '../interfaces/i.file-db';
import { IFileStream } from '../interfaces/i.file-stream';
import { FileDto } from '../dto/file.dto';

// tslint:disable-next-line: no-var-requires
const shortid = require('shortid');
// tslint:disable-next-line: no-var-requires
const fs = require('fs');
// tslint:disable-next-line: no-var-requires
const mkdirp = require('mkdirp');

@Injectable()
export class FilesService {

  /**
   * Directory uploads
   */
  public dir: string;
  /**
   * constructor
   * @param fileModel mongoose model
   */
  constructor(@Inject('FileModelToken') private readonly fileModel: Model<IFileDb>) { }

  public async queryAll(): Promise<FileDto[]> {
    return await this.fileModel.find();
  }

  /**
   * Upload file
   * @param file Promise<IFileStream>
   */
  public singleUpload(file: Promise<IFileStream>) {
    return this.processUpload(file);
  }

  /**
   * MultipleUpload files
   * @param files Promise<IFileStream>[]
   */
  public multipleUpload(files: Promise<IFileStream>[]) {
    return Promise.all(files.map(file => this.processUpload(file)));
  }

  /**
   * Create Directory uploads
   * @param dir Directory uploads
   */
  public async mkdir(dir: string) {
    this.dir = dir;
    return mkdirp(dir, (err: NodeJS.ErrnoException) => {
      if (err) {
        logger.error(err);
        return;
      }
      logger.info('Make upload directory successfully');
    });
  }

  /**
   * Create file
   * @param file Promise<IFileStream>
   * @returns Promise<IFile>
   */
  private async processUpload(file: Promise<IFileStream>): Promise<IFile> {
    try {
      const { filename, mimetype, encoding, createReadStream }: IFileStream = await file;
      const stream = createReadStream();
      const { fileId, filepath } = await this.storeFS(stream, filename);
      return this.storeDB({ fileId, filepath, mimetype, encoding, filename });
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  }

  /**
   * Save in DB
   * @param file IFile
   * @returns IFile
   */
  private storeDB(file: IFile): Promise<IFileDb> {
    return new this.fileModel(file).save();
  }

  /**
   * Create file in FS
   * @param stream
   * @param filename
   * @returns Promise<{ fileId: string; filepath: string }>
   */
  private storeFS(stream: any, filename: string): Promise<{ fileId: string; filepath: string }> {
    const fileId: string = shortid.generate();
    const filepath: string = `${this.dir}/${fileId}-${filename}`;
    return new Promise((resolve, reject) => {
      stream.on('error', err => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(filepath);
        }
        reject(err);
      });

      stream
        .pipe(fs.createWriteStream(filepath))
        .on('error', (err) => reject(err))
        .on('finish', () => resolve({ fileId, filepath }));
    });
  }
}
