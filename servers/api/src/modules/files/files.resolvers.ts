import { join } from 'path';

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { IFile } from './interfaces/i.file';
import { FilesService } from './services/files.service';
import { FileDto } from './dto/file.dto';

@Resolver('User')
export class FilesResolvers {
  constructor(private readonly filesService: FilesService) {}

  @Mutation('singleUpload')
  async singleUpload(@Args('file') file): Promise<IFile> {
    await this.filesService.mkdir(join(__dirname, '../../../uploads/images'));
    return await this.filesService.singleUpload(file);
  }

  @Mutation('multipleUpload')
  async multipleUpload(@Args('file') files): Promise<IFile[]> {
    await this.filesService.mkdir(join(__dirname, '../../../uploads/images'));
    return await this.filesService.multipleUpload(files);
  }

  @Query('uploads')
  async queryAll(): Promise<FileDto[]> {
    return await this.filesService.queryAll();
  }
}
