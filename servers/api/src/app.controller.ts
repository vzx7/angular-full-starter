import { Controller, Get, Render, Res, UseGuards, Param } from '@nestjs/common';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() { }

  /**
   * Root
   */
  @Get()
  create() {
    return 'This api server runing! Welcome...';
  }

  /**
   * Get files
   * @param fileName
   * @param res
   */
  @Get('files/images/:fileName')
  async serveAvatar(@Param('fileName') fileName: string, @Res() res): Promise<any> {
    res.sendFile(fileName, { root: join(__dirname + '../../uploads/images/')});
  }
}
