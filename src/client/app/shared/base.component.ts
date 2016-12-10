import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
/**
 * Created by sange on 10/12/2016.
 */


export class BaseComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}