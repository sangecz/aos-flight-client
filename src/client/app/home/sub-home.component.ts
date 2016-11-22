import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { INCREMENT, DECREMENT, RESET } from './counter';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sub-home',
  template: `
        <h5>sub</h5>
        <button (click)="increment()">Increment</button>
        <div>Current Count: {{ counter | async }}</div>
        <button (click)="decrement()">Decrement</button>

        <button (click)="reset()">Reset Counter</button>
    `
})
export class SubHomeComponent {

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
