import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { DestinationService } from '../shared/index';
import { SortService } from "../shared/sort/sort.service";
import { Observable } from 'rxjs/Observable';
import { DestinationState, DESTINATION_TAG } from '../shared/destination/destination.state';

const sortField = 'name';

@Component({
  moduleId: module.id,
  selector: 'sd-destination',
  template: `
    <h2>Add destination</h2>
    <destination-form [destination]="selectedDestination" (onDestinationChange)="addDestination($event)"></destination-form>
    
    <error-message [errorMessage]="errorMessage"></error-message>
    
    <destination-list
      [destinations]="destinations"
      [sortClass]="(state$ | async)?.sort?.order"
      (destinationSelected)="selectDestination($event)"
      (sortChanged)="changeSort()"
    ></destination-list>`
})
export class DestinationComponent implements OnInit {

  errorMessage: string;
  destinations: Destination[];
  selectedDestination: Destination;
  state$: Observable<DestinationState>;

  constructor(public destinationService: DestinationService,
              private router: Router,
              private sortService: SortService) {
    this.state$ = <Observable<DestinationState>> sortService.registerSort(DESTINATION_TAG, sortField);
  }

  ngOnInit() {
    this.getDestinations();
  }

  getDestinations() {
    this.state$.subscribe(
      state => {
        this.destinationService.getAll(state.sort)
          .subscribe(
            destinations => this.destinations = destinations,
            error => this.errorMessage = error
          );
      });
  }

  addDestination(destination: Destination) {
    this.destinationService.create(destination)
      .subscribe(
        res => this.getDestinations(),
        err => this.errorMessage = err
      );
  }

  selectDestination(destination: Destination) {
    this.router.navigate(['/client/destination', destination.id]);
  }

  changeSort() {
    this.sortService.toggleSort(DESTINATION_TAG, sortField);
    this.getDestinations();
  }

}
