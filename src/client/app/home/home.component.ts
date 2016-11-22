import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../shared/index';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET } from './counter';
import { AppState } from '../app.state';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  template: `
        <h5>main</h5>
        <button (click)="increment()">Increment</button>
        <div>Current Count: {{ counter | async }}</div>
        <button (click)="decrement()">Decrement</button>

        <button (click)="reset()">Reset Counter</button>
        
        <hr />
        
        <sub-home></sub-home>
    `
})
export class HomeComponent {

  counter: Observable<number>;

  constructor(private store: Store<AppState>){
    this.counter = <Observable<number>> store.select('counter');
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }
}
