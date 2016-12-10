import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';

import { FlightService } from '../shared/flight/flight.service';
import { SortService } from '../shared/sort/sort.service';
import { DepartureFilter } from '../shared/filter/filter';
import { Pagination } from '../shared/pagination/pagination';
import { FlightState, FLIGHT_TAG } from '../shared/flight/flight.state';
import { ToastUtils } from '../shared/util/util';
import { AuthService } from '../shared/auth/auth.service';
import { BaseComponent } from '../shared/base.component';

const flightSortFields = {
  name: 'name',
  departure: 'dateOfDeparture'
};


/**
 * ngrx/store used on sort only
 */
@Component({
  moduleId: module.id,
  selector: 'sd-flight',
  templateUrl: 'flight.component.html',
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class FlightComponent extends BaseComponent implements OnInit {

  destinations: Destination[];
  departureField = flightSortFields.departure;
  nameField = flightSortFields.name;
  selectedSortField = this.departureField;
  state$: Observable<FlightState>;
  filter: DepartureFilter;
  pagination: Pagination;

  recordCount = 0;
  flights: any[] = [];
  selectedFlight: Flight;

  constructor(public flightService: FlightService,
              public route: ActivatedRoute,
              private router: Router,
              private sortService: SortService,
              private toast: ToastyService,
              private authService: AuthService) {
    super();
    this.state$ = <Observable<FlightState>> sortService.registerSort(FLIGHT_TAG, this.nameField);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
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
      this.sortService.switchSort(FLIGHT_TAG, field);
    }
    this.sortService.toggleSort(FLIGHT_TAG, field);
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

  private getFlights() {
    this.subscription = this.state$.subscribe(
      state => {
        this.flightService.getAll(state.sort, this.filter, this.pagination)
          .subscribe(
            (res) => {
              this.flights = res[0];
              this.recordCount = res[1];

              this.mapFlightsToDestionations();
            },
            (err) => this.toast.error(ToastUtils.set(err))
          );
      });
  }

  private mapFlightsToDestionations() {
    this.flights.forEach((f: Flight) => {
      this.destinations.forEach(d => {
        if (f.from === d.id) f.fromName = d.name;
        if (f.to === d.id) f.toName = d.name;
      });
    });
  }

  private loadData() {
    this.route.data.subscribe((data: {destinations: Destination[]}) => {
      this.destinations = data.destinations;

      this.getFlights();
    });
  }
}
