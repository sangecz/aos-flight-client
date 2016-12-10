/**
 * Created by sange on 06/11/2016.
 */
import { Injectable } from '@angular/core';
import { Constants } from '../config/app.constants';
import { UserType } from '../user-switch/user-type';

@Injectable()
export class AuthService {

  username: string = Constants.users.admin.username;
  password: string = Constants.users.admin.password;

  setUser(userType: UserType) {
    switch (userType) {
      case 'manager':
        this.username = Constants.users.manager.username;
        this.password = Constants.users.manager.password;
        break;

      case 'admin':
        this.username = Constants.users.admin.username;
        this.password = Constants.users.admin.password;
        break;

      default:
        this.username = Constants.users.user.username;
        this.password = Constants.users.user.password;
    }
  }

  get isAdmin() {
    return this.username === 'admin';
  }

  get isManager() {
    return this.username === 'manager';
  }
}

