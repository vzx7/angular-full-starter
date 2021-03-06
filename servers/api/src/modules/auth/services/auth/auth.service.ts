
import { Injectable } from '@nestjs/common';
import { UsersService } from 'modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }
}
