import { Controller, Get, UseGuards, Render, Res } from '@nestjs/common';

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
}
