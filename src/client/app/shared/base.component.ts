import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoadingService } from './loading/loading.service';
import { ServiceLocator } from './service-locator';
/**
 * Created by sange on 10/12/2016.
 */


export class BaseComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  protected loadingService: LoadingService;

  constructor() {
    this.loadingService = ServiceLocator.injector.get(LoadingService);
  }

  ngOnInit(): void {
    ;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
