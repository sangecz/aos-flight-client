import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Config } from './../../shared/index';
import { UserType } from '../user-switch/user-type';
import { AuthService } from '../auth/auth.service';
import { WebSocketService } from '../websockets/websocket.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  template: `
    <h1>{{appTitle}}</h1>
    <span *ngIf="ws.connectedClientsCnt">| {{ws.connectedClientsCnt}} online</span>
    <user-switch 
      [select]="'admin'"
      (onSelectedUser)="userSelected($event)">  
    </user-switch>
  `,
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {

  appTitle: string;

  constructor(private authService: AuthService,
              public ws: WebSocketService) {
    this.appTitle = Config.APP_TITLE;
  }

  userSelected(userType: UserType) {
    this.authService.setUser(userType);
  }
}

