import { Injectable } from '@nestjs/common';

@Injectable()
export class SAuthService {
  //constructor(private readonly usersService: SUserService) {}
  constructor() {}

  //async validateUser(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    //return await this.usersService.findOneByToken(token);
  //}
}