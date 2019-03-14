import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    this.userService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
