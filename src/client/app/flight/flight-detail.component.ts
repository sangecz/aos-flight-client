/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';
import { DestinationService } from '../shared/destination/destination.service';

@Component({
  moduleId: module.id,
  selector: 'flight-detail',
  template: `
    <h2>Edit flight</h2>

    <flight-form
      [destinations]="destinations"
      [flight]="selectedFlight"
      [isDetail]="true"
      (onFlightChange)="saveFlight($event)"
      (onRemove)="removeFlight($event)"
      (onBack)="back($event)"
    >
    
    </flight-form>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class FlightDetailComponent implements OnInit {

  destinations: Destination[];
  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {obj: {flight: Flight, destinations: Destination[]}}) => {
      this.selectedFlight = data.obj.flight;
      this.destinations = data.obj.destinations;
    });
  }

  saveFlight(flight: Flight) {
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
