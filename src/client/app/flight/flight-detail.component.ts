/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';
import { BaseComponent } from '../shared/base.component';

@Component({
  moduleId: module.id,
  selector: 'flight-detail',
  template: `
    <h2>Flight detail</h2>

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
export class FlightDetailComponent extends BaseComponent implements OnInit {

  destinations: Destination[];
  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }

  saveFlight(flight: Flight) {
    if (flight) {
      this.loadingService.startLoading();

      this.flightService.update(flight)
        .finally(this.loadingService.stopLoading.bind(this.loadingService))
        .subscribe(
          () => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeFlight(id: number) {
    this.loadingService.startLoading();

    this.flightService.remove(id)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        res => {
          ;
        },
        err => this.toast.error(ToastUtils.set(err)),
        () => this.back()
      );
  }

  back() {
    this.router.navigate(['/client/flight']);
  }


  private loadData() {
    this.loadingService.startLoading();

    this.route.data
      .subscribe((data: {obj: {flight: Flight, destinations: Destination[]}}) => {
        this.selectedFlight = data.obj.flight;
        this.destinations = data.obj.destinations;
        this.loadingService.stopLoading();
      });
  }
}
