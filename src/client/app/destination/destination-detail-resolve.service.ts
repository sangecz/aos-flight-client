import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';

import { ToastUtils } from '../shared/util/util';
import { DestinationService } from '../shared/destination/destination.service';
/**
 * Created by sange on 29/11/2016.
 */

@Injectable()
export class DestinationDetailResolve implements Resolve<Flight> {

  constructor(private destinationService: DestinationService,
              private router: Router,
              private toast: ToastyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];

    return this.destinationService.getOne(id)
      .catch(err => {
        this.toast.error(ToastUtils.set(err));
        this.router.navigate(['/client/destination']);
        return Observable.of(false);
      });
  }
}