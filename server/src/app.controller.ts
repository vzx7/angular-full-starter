import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
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