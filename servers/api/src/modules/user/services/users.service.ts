import { Model } from 'mongoose';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { JwtPayload } from '../../auth/models/jwt-payload.interface';
import { CreateUpdateUserDto } from '../dto/create-update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.interface';

@Injectable()
export class UsersService {

  constructor(@Inject('UserModelToken') private readonly userModel: Model<User>) {}

  async createUser(data: CreateUpdateUserDto) {
    const createdUser = new this.userModel(data);

    return await createdUser.save();
  }

  async findAll(page: number = 1, limit: number = 20, newest: boolean = true) {

    return [];
  }

  async findOneById(id: string) {

    return new UserDto();
  }

  /*   async validateUser(payload: JwtPayload): Promise<UserDto> {
      return this.findOneById(payload.id);
    } */

  async read(username: string) {

    return [];
  }

  async signIn(data: /* SignInUserDto */ any) {

    return [];
  }

  async signUp(data: /* SignUpUserDto */ any) {

    return [];
  }

  async updateUser(data: /* CreateUpdateUserDto */ any) {

    return new UserDto();
  }

  async deleteUser(id: string) {

    return true;
  }

  async findOneByToken(token: string): Promise<User> {

    return await this.userModel.findOne({ token }).exec();
  }
}
