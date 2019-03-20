import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Roles } from '../../decorators/roles.decorators';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.interface';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  // TODO pagination cursor instead of page???
  @Query('users')
/*   @Roles('ADMIN')
  @UseGuards(new AuthGuard()) */
  async getUsers(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('newest') newest: boolean,
  ): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query('user')
  @Roles('ADMIN', 'USER')
  @UseGuards(new AuthGuard())
  async findOneById(@Args('id') id: string): Promise<UserDto> {
    return await this.usersService.findOneById(id);
  }

  @Mutation('createUser')
/*   @Roles('ADMIN')
  @UseGuards(new AuthGuard()) */
  async createUser(
    @Args('createUserInput') args: CreateUserDto,
  ): Promise<UserDto> {
    const createdUser = await this.usersService.createUser(args);
    return createdUser;
  }

  @Mutation('updateUser')
/*   @Roles('ADMIN')
  @UseGuards(new AuthGuard()) */
  async updateUser(
    @Args('updateUserInput') args: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.usersService.updateUser(args);
    return updatedUser;
  }

  @Mutation('deleteUser')
  @Roles('ADMIN')
  @UseGuards(new AuthGuard())
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.deleteUser(id);
  }

  @Mutation('signUp')
  async signUp(@Args('signUp') args: UpdateUserDto): Promise<string> {
    console.log(args);
    return await this.usersService.signUp(args);
  }
}
