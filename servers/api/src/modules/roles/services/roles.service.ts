import { Model } from 'mongoose';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Role } from '../models/role.interface';
import { RolesDto } from '../dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('RoleModelToken') private readonly roleModel: Model<Role>) {}

  async findAll(page: number = 1) {

    return [new RolesDto()];
  }

  async findOneById(id: string) {
    return new RolesDto();
  }

  async createRole(name: string) {
    return new RolesDto();
  }

  async updateRole(id: string, name: string) {
    return new RolesDto();
  }

  async deleteRole(id: string) {
    return true;
  }
}
