/**
 * Created by sange on 11/12/2016.
 */

import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'aos-password',
  template: `
    <input 
    (click)="toggle($event)" 
    [attr.type]="states[currentState].type" 
    [attr.value]="value"  
    />
  `
})
export class PasswordComponent {

  states: any = [
    {btnText: 'show', type: 'password'},
    {btnText: 'hide', type: 'text'}
  ];

  currentState = 0;
  @Input() value: string;

  toggle(event: any) {
    event.stopPropagation();
    this.currentState = (this.currentState + 1) % 2;
  }
}
