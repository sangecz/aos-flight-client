/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';

@Component({
  moduleId: module.id,
  selector: 'flight-detail',
  template: `
    <h2>Edit flight</h2>

    <flight-form
      [flight]="selectedFlight"
      [isDetail]="true"
      (onFlightChange)="saveFlight($event)"
      (onRemove)="removeFlight($event)"
      (onBack)="back($event)"
    >
    
    </flight-form>
  `
})
export class FlightDetailComponent implements OnInit {

  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // + konvertuje string na number
      this.flightService.getOne(id)
        .subscribe(
          flight => this.selectedFlight = flight,
          err => this.toast.error(ToastUtils.set(err))
        );
    });
  }

  saveFlight(flight: Flight) {
    console.log('save', flight);
    if (flight) {
      this.flightService.update(flight)
        .subscribe(
          () => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeFlight(id: number) {
    this.flightService.remove(id)
      .subscribe(
        () => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  back() {
    this.router.navigate(['/client/flight']);
  }

}
