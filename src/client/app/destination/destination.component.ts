import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { DestinationService } from '../shared/index';
import { SortService } from "../shared/sort/sort.service";
import { Sort } from '../shared/sort/sort';

@Component({
  moduleId: module.id,
  selector: 'sd-destination',
  template: `
    <h2>Add destination</h2>
    <destination-form [destination]="selectedDestination" (onDestinationChange)="addDestination($event)"></destination-form>
    
    <error-message [errorMessage]="errorMessage"></error-message>
    
    <destination-list
      [destinations]="destinations"
      (destinationSelected)="selectDestination($event)"
      (sortChanged)="sortChanged($event)"
    ></destination-list>`
})
export class DestinationComponent implements OnInit {

  errorMessage: string;
  destinations: Destination[];
  selectedDestination: Destination;

  constructor(public destinationService: DestinationService,
              private router: Router,
              private sortService: SortService
  ) {
  }

  ngOnInit() {
    this.getDestinations();
    // this.sortService.setSorts({order: null, field: sortNameField});
  }

  getDestinations() {
    // this.destinationService.getAll(this.sortService.getSortFor(sortNameField))
    this.destinationService.getAll(null) //FIXME ngrx sorting shit
      .subscribe(
        destinations => this.destinations = destinations,
        error => this.errorMessage = error
      );
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

  sortChanged() {
    this.getDestinations();
  }
}
