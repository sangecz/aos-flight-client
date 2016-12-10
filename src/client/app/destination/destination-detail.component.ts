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
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class DestinationDetailComponent implements OnInit {

  selectedDestination: Destination;

  constructor(public destinationService: DestinationService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {destination: Destination}) => {
      this.selectedDestination = data.destination;
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
