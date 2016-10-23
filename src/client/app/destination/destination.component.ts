import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { DestinationService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-destination',
  templateUrl: 'destination.component.html',
  styleUrls: ['destination.component.css'],
})

export class DestinationComponent implements OnInit {

  errorMessage: string;
  destinations: any[] = [];
  selectedDestination: Destination = {
    name: null,
    lat: null,
    lon: null,
    url: null,
    id: null
  };

  constructor(
    public destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDestinations();
  }

  getDestinations() {
    this.destinationService.get()
      .then(destinations => this.destinations = destinations)
      .catch(error => this.errorMessage = <any>error);
  }

  addDestination(destination: Destination)  {
    this.destinationService.create(destination)
      .then(this.getDestinations.bind(this))
      .catch(err => {
        this.errorMessage = <any>err;
        setTimeout(() => this.errorMessage = '', 1000);
      });

  }

  selectDestination(destination: Destination){
    // this.selectedDestination = destination;
    this.router.navigate(['/destination', destination.id]);
  }

}
