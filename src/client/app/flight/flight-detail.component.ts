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

  selectedFlight: Flight;

  constructor(
    public flightService: FlightService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // + konvertuje string na number
      this.flightService.getOne(id)
        .then(flight => this.selectedFlight = flight)
        .catch(this.back.bind(this));
    })
  }

  saveFlight(flight: Flight) {
    console.log('save', flight);
    if(flight) {
      this.flightService.update(flight)
        .then(this.back.bind(this));
    }
  }

  removeFlight(id: number) {
    this.flightService.remove(id)
      .then(this.back.bind(this));
  }

  back() {
    this.router.navigate(['/flight']);
  }

}