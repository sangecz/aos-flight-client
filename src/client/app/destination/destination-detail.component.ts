/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { DestinationService } from '../shared/destination/destination.service';
import { ToastUtils } from '../shared/util/util';

@Component({
  moduleId: module.id,
  selector: 'destination-detail',
  template: `
    <h2>Edit destination</h2>

    <destination-form
      [destination]="selectedDestination"
      [isDetail]="true"
      (onDestinationChange)="saveDestination($event)"
      (onRemove)="removeDestination($event)"
      (onBack)="back($event)"
    >
    
    </destination-form>
  `
})
export class DestinationDetailComponent implements OnInit {

  selectedDestination: Destination;

  constructor(public destinationService: DestinationService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: number = +params['id']; // + konvertuje string na number
      this.destinationService.getOne(id)
        .subscribe(
          destination => this.selectedDestination = destination,
          err => this.toast.error(ToastUtils.set(err))
        );
    });
  }

  saveDestination(destination: Destination) {
    if (destination) {
      this.destinationService.update(destination)
        .subscribe(
          res => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeDestination(id: number) {
    this.destinationService.remove(id)
      .subscribe(
        res => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  back() {
    this.router.navigate(['/client/destination']);
  }

}
