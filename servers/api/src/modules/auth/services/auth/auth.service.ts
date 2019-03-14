import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }
}