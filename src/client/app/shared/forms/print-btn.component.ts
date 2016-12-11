/**
 * Created by sange on 11/12/2016.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'print-btn',
  template: `
    <img src="./assets/img/print.png" (click)="print($event)" />
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
export class PrintButtonComponent {

  @Output() onPrintClicked = new EventEmitter<void>();

  print(event: any) {
    event.stopPropagation();
    this.onPrintClicked.emit();
  }

}
