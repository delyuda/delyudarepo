import { Injectable } from '@angular/core';

import { USERS } from './users-mock';

@Injectable()
export class UserService {

  constructor() { }

  getUsers(): [] {
    return USERS;
  }

}
