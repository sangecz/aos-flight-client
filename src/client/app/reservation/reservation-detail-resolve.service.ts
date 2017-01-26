import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';
/**
 * Created by sange on 28/11/2016.
 */

@Injectable()
export class ReservationDetailResolve implements Resolve<Flight> {

  constructor(private flightService: FlightService,
              private reservationService: ReservationService,
              private router: Router,
              private toast: ToastyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params['id'];
    const pwd = route.params['pwd'];

    return Observable.forkJoin(
      this.reservationService.getOne(id, pwd),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        return {
          reservation: res[0],
          flights: res[1][0]
        };
      })
      .catch(err => {
        this.toast.error(ToastUtils.set(err));
        this.router.navigate(['/client/reservation']);
        return Observable.of(false);
      });
  }
}
