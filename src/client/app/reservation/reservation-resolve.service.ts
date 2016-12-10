import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';
import { AuthService } from '../shared/auth/auth.service';
/**
 * Created by sange on 28/11/2016.
 */

@Injectable()
export class ReservationResolve implements Resolve<Flight> {

  constructor(private flightService: FlightService,
              private reservationService: ReservationService,
              private router: Router,
              private toast: ToastyService,
              private authService: AuthService) {
  }

  resolve(): Observable<any> {
    if (this.authService.isAdmin || this.authService.isManager) {
      return this.resolveAuth();
    } else {
      return this.resolveWithoutAuth();
    }
  }

  private resolveAuth() {
    return Observable.forkJoin(
      this.reservationService.getAll(),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        return {
          reservations: res[0],
          flights: res[1][0]
        };
      })
      .catch(err => this.handlerError(err));
  }

  private resolveWithoutAuth() {
    return this.flightService.getAll(null, null, null)
      .map(res => {
        return {
          reservations: null,
          flights: res[0]
        };
      })
      .catch(err => this.handlerError(err));
  }

  private handlerError(err: any) {
    this.toast.error(ToastUtils.set(err));
    this.router.navigate(['/client/reservation']);
    return Observable.of(false);
  }
}