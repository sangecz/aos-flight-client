/**
 * Created by sange on 11/12/2016.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'email-btn',
  template: `
    <img src="./assets/img/email.png" (click)="showInput($event)" />
    <span *ngIf="show">
      <input (click)="inputClicked($event)" [(ngModel)]="email" /> <button (click)="sendToEmail($event)">Ok</button>
    </span>
  `,
  styles: [`
    img {
      background-color: #5bc0de;
      border-radius: 50%;
      cursor: pointer;
      padding: 4px;
    }
  `]
})
export class EmailButtonComponent {

  email: string = '';
  show: boolean = false;

  @Output() onSendToEmailClicked = new EventEmitter<string>();

  showInput(event: any) {
    event.stopPropagation();
    this.show = true;
  }

  sendToEmail(event: any) {
    event.stopPropagation();
    this.onSendToEmailClicked.emit(this.email);
    this.show = false;
  }

  inputClicked(event: any){
    event.stopPropagation();
  }

}
