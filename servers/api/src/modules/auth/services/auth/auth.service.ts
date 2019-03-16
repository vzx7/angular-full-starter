import { UsersService } from 'src/modules/user/services/users.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }
}