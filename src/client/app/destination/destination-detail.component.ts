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
        .then(destination => {
          this.selectedDestination = destination;
          console.log(destination);
        })
        .catch(this.back.bind(this));
    })
  }

  saveDestination(destination: Destination) {
    console.log('save', destination);
    if(destination) {
      this.destinationService.update(destination)
        .then(this.back.bind(this));
    }
  }

  removeDestination(id: number) {
    this.destinationService.remove(id)
      .then(this.back.bind(this));
  }

  back() {
    this.router.navigate(['/destination']);
  }

}