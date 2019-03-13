import { Controller, Get, UseGuards, Render, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() { }

  /**
   * Static answer
   * @param res answer
   */
  @Get()
  root(@Res() res) {
    res.sendFile("index.html");
  }

  /**
   * get users
   */
  @Get('users')
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return [];
  }
}
