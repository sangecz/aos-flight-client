import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlightService} from "../shared/flight/flight.service";
import {SortService} from "../shared/util/sort.service";
import {Sort} from "../shared/util/sort";
import {DepartureFilter} from "../shared/util/filter";
import {Pagination} from "../shared/util/pagination";

const emptyFilter: DepartureFilter = {from: '', to: ''};

@Component({
  moduleId: module.id,
  selector: 'sd-flight',
  templateUrl: 'flight.component.html',
  styleUrls: ['flight.component.css'],
})
export class FlightComponent implements OnInit {

  /**
   * 0 == no sort
   * 1 == asc
   * 2 == desc
   */
  orderValue: number = 0;
  departureField = 'dateOfDeparture';
  nameField = 'name';
  sorts: Sort[] = [
    { order: null, field: this.nameField},
    { order: null, field: this.departureField}
  ];
  selectedSortField = this.departureField;

  filter: DepartureFilter = emptyFilter;
  pagination: Pagination;
  recordCount = 0;

  errorMessage: string;
  flights: any[] = [];
  selectedFlight: Flight = {
    id: null,
    name: null,
    dateOfDeparture: null,
    distance: null,
    seats: null,
    price: null,
    from: null,
    to: null,
    url: null
  };

  constructor(
    public flightService: FlightService,
    private router: Router,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.getFlights();
    this.sortService.setSorts(this.sorts[0], this.sorts[1]);
  }

  getFlights() {
    const sort = this.sortService.getSortFor(this.selectedSortField);
    this.flightService.getAll(sort, this.filter, this.pagination)
      .then((res) => {
        this.flights = res[0];
        this.recordCount = res[1];
      })
      .catch(error => this.errorMessage = <any>error);
  }

  addFlight(flight: Flight)  {
    this.flightService.create(flight)
      .then(this.getFlights.bind(this))
      .catch(err => {
        this.errorMessage = <any>err;
        setTimeout(() => this.errorMessage = '', 1000);
      });

  }

  selectFlight(flight: Flight){
    // this.selectedFlight = flight;
    this.router.navigate([flight.url]);
  }

  changeSort(field: string) {
    if(field !== this.selectedSortField) {
      this.selectedSortField = field;
      this.orderValue = 0;
    }
    this.orderValue = (this.orderValue + 1) % 3;
    this.sortService.changeOrderFor(this.selectedSortField, this.orderValue);
    this.getFlights();
  }

  getSortClass(field: string): string {
    const sort: Sort = this.sortService.getSortFor(field);
    return  sort && sort.order ? sort.order : ''
  }

  getFilterClass(): string {
    return this.filter && this.filter.from && this.filter.to ? 'cross' : '';
  }

  paginationChanged(pagination: Pagination){
    this.pagination = pagination;
    this.getFlights();
  }

  clearFilter(){
    this.filter.from = '';
    this.filter.to = '';
    this.getFlights();
  }

}
