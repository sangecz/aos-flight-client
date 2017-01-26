import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { FlightService } from '../shared/flight/flight.service';
import { ToastUtils } from '../shared/util/util';
import { DestinationService } from '../shared/destination/destination.service';
/**
 * Created by sange on 28/11/2016.
 */

@Injectable()
export class FlightDetailResolve implements Resolve<Flight> {

  constructor(private flightService: FlightService,
              private destinationService: DestinationService,
              private router: Router,
              private toast: ToastyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];

    return Observable.forkJoin(
      this.flightService.getOne(id),
      this.destinationService.getAll(null)
      )
      .map(res => {
        return {
          flight: res[0],
          destinations: res[1]
        };
      })
      .catch(err => {
        this.toast.error(ToastUtils.set(err));
        this.router.navigate(['/client/flight']);
        return Observable.of(false);
      });
  }
}
