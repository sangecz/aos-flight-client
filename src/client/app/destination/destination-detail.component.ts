/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {DestinationService} from "../shared/destination/destination.service";

@Component({
  moduleId: module.id,
  selector: 'destination-detail',
  templateUrl: 'destination-detail.component.html'
})
export class DestinationDetailComponent implements OnInit {

  errorMessage: string;
  selectedDestination: Destination;

  constructor(
    public destinationService: DestinationService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: number = +params['id']; // + konvertuje string na number
      this.destinationService.getOne(id)
        .subscribe(
          destination => this.selectedDestination = destination,
          err => this.errorMessage = err
        );
    })
  }

  saveDestination(destination: Destination) {
    if(destination) {
      this.destinationService.update(destination)
        .subscribe(
          res => this.back(),
          err => this.errorMessage = err
        );
    }
  }

  removeDestination(id: number) {
    this.destinationService.remove(id)
      .subscribe(
        res => this.back(),
        err => this.errorMessage = err
      );
  }

  back() {
    this.router.navigate(['/client/destination']);
  }

}