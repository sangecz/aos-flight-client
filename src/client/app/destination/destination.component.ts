import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {DestinationService} from '../shared/index';
import {SortService} from "../shared/util/sort.service";

const nameField = 'name';

@Component({
  moduleId: module.id,
  selector: 'sd-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.css'],
})
export class DestinationComponent implements OnInit {

  errorMessage: string;
  /**
   * 0 == no sort
   * 1 == asc
   * 2 == desc
   */
  private orderValue: number = 0;
  destinations: any[] = [];
  selectedDestination: Destination = {
    name: null,
    lat: null,
    lon: null,
    url: null,
    id: null
  };

  constructor(public destinationService: DestinationService,
              private router: Router,
              private sortService: SortService) {
  }

  ngOnInit() {
    this.getDestinations();
    this.sortService.setSorts({order: null, field: 'name'});
  }

  getDestinations() {
    this.destinationService.getAll(this.sortService.getSortFor(nameField))
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

  changeSort() {
    this.orderValue = (this.orderValue + 1) % 3;
    this.sortService.changeOrderFor(nameField, this.orderValue);
    this.getDestinations();
  }

  getSortClass(): string {
    return this.sortService.getSortFor(nameField).order ? this.sortService.getSortFor(nameField).order : ''
  }


}
