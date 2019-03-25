import { join } from 'path';

import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IFile } from './interfaces/i.file';
import { FilesService } from './services/files.service';

@Resolver('User')
export class FilesResolvers {
  constructor(private readonly filesService: FilesService) {}

  @Mutation('singleUpload')
  async singleUpload(@Args('file') file): Promise<IFile> {
    await this.filesService.mkdir(join(__dirname, '../../../uploads/images'));
    return await this.filesService.singleUpload(file);
  }
}
