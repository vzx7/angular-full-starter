import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly catsService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    this.catsService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.catsService.findAll();
  }
}
