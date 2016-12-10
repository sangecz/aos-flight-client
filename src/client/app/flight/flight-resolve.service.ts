/**
 * Created by sange on 10/12/2016.
 */
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { ToastUtils } from '../shared/util/util';
import { DestinationService } from '../shared/destination/destination.service';
/**
 * Created by sange on 28/11/2016.
 */

@Injectable()
export class FlightResolve implements Resolve<Flight> {

  constructor(private destinationService: DestinationService,
              private toast: ToastyService) {
  }

  resolve(): Observable<any> {

    return this.destinationService.getAll(null)
      .catch(err => {
        this.toast.error(ToastUtils.set(err));
        return Observable.of(false);
      });
  }

}