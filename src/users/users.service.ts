import { Injectable } from '@nestjs/common';

import { IUserSignUp } from './interfaces/user-sign-up.interface';

@Injectable()
export class UsersService {
  signUp(input: IUserSignUp) {
    return input.name;
  }
}
