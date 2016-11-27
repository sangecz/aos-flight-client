import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { FlightService } from "../shared/flight/flight.service";
import { SortService } from "../shared/sort/sort.service";
import { DepartureFilter } from "../shared/filter/filter";
import { Pagination } from "../shared/pagination/pagination";
import { FlightState, FLIGHT_TAG } from '../shared/flight/flight.state';

@Component({
  moduleId: module.id,
  selector: 'sd-flight',
  templateUrl: 'flight.component.html',
  styleUrls: ['flight.component.css'],
})
export class FlightComponent implements OnInit {

  errorMessage: string;
  // orderValue: number = 0;

  // sorts: Sort[] = [
  //   {order: null, field: this.nameField},
  //   {order: null, field: this.departureField}
  // ];

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
              private sortService: SortService) {
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
            (error) => this.errorMessage = error
          );
      });
  }

  addFlight(flight: Flight) {
    this.flightService.create(flight)
      .subscribe(
        res => this.getFlights(),
        err => this.errorMessage = err
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
