import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserModelToken') private readonly userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    console.log('CATS');
    const createdUser = new this.userModel(userDto);
    console.log(createdUser);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneByToken(token: string): Promise<User> {
    return await this.userModel.findOne({ token }).exec();
  }
}
