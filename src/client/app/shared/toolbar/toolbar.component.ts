import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Config } from './../../shared/index';
import { UserType } from '../user-switch/user-type';
import { AuthService } from '../auth/auth.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  template: `
    <h1>{{appTitle}}</h1>
    <user-switch 
      [select]="'admin'"
      (onSelectedUser)="userSelected($event)">  
    </user-switch>
  `,
  styleUrls: ['toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {

  appTitle: string;

  constructor(private authService: AuthService) {
    this.appTitle = Config.APP_TITLE;
  }

  userSelected(userType: UserType) {
    this.authService.setUser(userType);
  }
}

