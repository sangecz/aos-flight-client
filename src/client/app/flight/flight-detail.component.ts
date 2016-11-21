/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {FlightService} from "../shared/flight/flight.service";

@Component({
  moduleId: module.id,
  selector: 'flight-detail',
  templateUrl: 'flight-detail.component.html'
})
export class FlightDetailComponent implements OnInit {

  errorMessage: string;
  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // + konvertuje string na number
      this.flightService.getOne(id)
        .subscribe(
          flight => this.selectedFlight = flight,
          err => this.errorMessage = err
        );
    });
  }

  saveFlight(flight: Flight) {
    console.log('save', flight);
    if (flight) {
      this.flightService.update(flight)
        .subscribe(
          () => this.back(),
          err => this.errorMessage = err
        );
    }
  }

  removeFlight(id: number) {
    this.flightService.remove(id)
      .subscribe(
        () => this.back(),
        err => this.errorMessage = err
      );
  }

  back() {
    this.router.navigate(['/client/flight']);
  }

}