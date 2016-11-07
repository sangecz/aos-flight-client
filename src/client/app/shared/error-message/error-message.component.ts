/**
 * Created by sange on 06/11/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'error-message',
  templateUrl: 'error-message.component.html',
  styleUrls: ['error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  errorMessageValue: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  set errorMessage(val: any){
    if(val) {
      this.errorMessageValue = val;
      setTimeout(() => {
        this.errorMessageValue = '';
        this.onDismiss.emit(null);
      }, 5000);
    }
  }

  @Output()
  onDismiss = new EventEmitter<any>();

}