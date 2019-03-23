import { Model } from 'mongoose';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { JwtPayload } from '../../auth/models/jwt-payload.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.interface';
import { SignUpUserDto } from '../dto/sign-up-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@Inject('UserModelToken') private readonly userModel: Model<User>) { }

  /**
   * Get All Users
   * @return Promise<UserDto[]>
   */
  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find();
  }

  /**
   * Get one User
   * @param id User ID
   * @returns
   */
  async findUserById(id: string): Promise<UserDto> {
    return this.userModel.findOne({ _id: id });
  }

  /**
   * Create User
   * @param data User data.
   * @return Promise<UserDto>
   */
  async createUser(data: CreateUserDto): Promise<UserDto> {
    const createdUser = new this.userModel(data);

    return await createdUser.save();
  }

  /**
   * Update User
   * @param user User data
   */
  async updateUser(user: UpdateUserDto): Promise<UserDto> {
    return this.userModel.findOneAndUpdate({_id: user.id}, user);
  }

  /**
   * Delete User
   * @param id User ID
   * @return Promise<{ ok?: number; n?: number; }>
   */
  async deleteUser(id: string): Promise<{ ok?: number; n?: number; }> {
    return await this.userModel.deleteOne({ _id: id });
  }

  /**
   * Delete Users
   * @param ids User's ID
   * @return Promise<{ ok?: number; n?: number; }>
   */
  async deleteUsers(ids: string[]): Promise<{ ok?: number; n?: number; }> {
    return await this.userModel.deleteMany({ _id: { $in: ids } });
  }

  /*   async validateUser(payload: JwtPayload): Promise<UserDto> {
      return this.findOneById(payload.id);
    } */

  async read(login: string) {

    return [];
  }

  async signIn(data: /* SignInUserDto */ any) {

    return [];
  }

  async signUp(data: /* SignUpUserDto */ any) {
    return '';
  }

  async findOneByToken(token: string): Promise<User> {

    return await this.userModel.findOne({ token }).exec();
  }
}
