import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { FlightService } from '../shared/flight/flight.service';
import { SortService } from '../shared/sort/sort.service';
import { DepartureFilter } from '../shared/filter/filter';
import { Pagination } from '../shared/pagination/pagination';
import { FlightState, FLIGHT_TAG } from '../shared/flight/flight.state';
import { ToastUtils } from '../shared/util/util';

@Component({
  moduleId: module.id,
  selector: 'sd-flight',
  templateUrl: 'flight.component.html',
  styleUrls: ['flight.component.css'],
})
export class FlightComponent implements OnInit {

  departureField = 'dateOfDeparture';
  nameField = 'name';
  selectedSortField = this.departureField;
  state$: Observable<FlightState>;
  filter: DepartureFilter;
  pagination: Pagination;

  recordCount = 0;
  flights: any[] = [];
  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              private router: Router,
              private sortService: SortService,
              private toast: ToastyService) {
    this.state$ = <Observable<FlightState>> sortService.registerSort(FLIGHT_TAG, this.nameField);
  }

  ngOnInit() {
    this.getFlights();
  }

  getFlights() {
    this.state$.subscribe(
      state => {
        this.flightService.getAll(state.sort, this.filter, this.pagination)
          .subscribe(
            (res) => {
              this.flights = res[0];
              this.recordCount = res[1];
            },
            (err) => this.toast.error(ToastUtils.set(err))
          );
      });
  }

  addFlight(flight: Flight) {
    this.flightService.create(flight)
      .subscribe(
        res => this.getFlights(),
        err => this.toast.error(ToastUtils.set(err))
      );

  }

  selectFlight(flight: Flight) {
    this.router.navigate(['/client/flight', flight.id]);
  }

  changeSort(field: string) {
    if (field !== this.selectedSortField) {
      this.selectedSortField = field;
      // this.orderValue = 0;
      this.sortService.switchSort(FLIGHT_TAG, field);
    }
    this.sortService.toggleSort(FLIGHT_TAG, field);
    this.getFlights();
  }

  getSortClass(field: string): Observable<any> {
    if (this.selectedSortField === field) {
      return this.state$;
    }
    return Observable.of({sort: {order: ''}});
  }

  getFilterClass(): string {
    return this.filter && (this.filter.from || this.filter.to) ? 'cross' : '';
  }

  paginationChanged(pagination: Pagination) {
    this.pagination = pagination;
    this.getFlights();
  }

  applyFilter(filter: DepartureFilter) {
    this.filter = filter;
    this.getFlights();
  }

}
