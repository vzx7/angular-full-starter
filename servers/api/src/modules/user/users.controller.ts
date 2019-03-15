import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User } from './models/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    this.usersService.createUser(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> { 
    return this.usersService.findAll();
  }
}
