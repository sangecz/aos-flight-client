/**
 * Created by sange on 04/12/2016.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserType } from './user-type';

@Component({
  moduleId: module.id,
  selector: 'user-switch',
  template: `
    <span>
      <button [ngClass]="[ getClass('user'), 'left']" (click)="switchTo('user')">User</button>
      <button [ngClass]="[ getClass('manager') ]" (click)="switchTo('manager')">Manager</button>
      <button [ngClass]="[ getClass('admin'), 'right']" (click)="switchTo('admin')">Admin</button>
    </span>  
  `,
  styles: [`
    button {
      height: 28px;
      width: 70px;
      padding: 2px 2px;
      margin: 0;
      outline: none;
    }
    .switch-disabled {
      background-color: #8f8f8f;
    }
     .switch-disabled:hover {
      background-color: #0099ff;
    }
    .switch-selected {
      background-color: #0099ff;
    }
    .left {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .right {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  `]
})
export class UserSwitchComponent implements OnInit {

  @Input() select: UserType;
  @Output() onSelectedUser = new EventEmitter<UserType>();

  constructor() {
  }

  ngOnInit() {

  }

  switchTo(userType: UserType) {
    this.select = userType;
    this.onSelectedUser.emit(userType);
  }

  getClass(userType: UserType){
    return userType === this.select ? 'switch-selected' : 'switch-disabled';
  }

}