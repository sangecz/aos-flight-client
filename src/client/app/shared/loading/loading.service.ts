import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * Created by sange on 11/12/2016.
 */

@Injectable()
export class LoadingService {

  active$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  startLoading() {
    this.active$.next(true);
  }

  stopLoading() {
    this.active$.next(false);
  }
}
