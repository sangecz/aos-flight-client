/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { DestinationService } from '../shared/destination/destination.service';
import { ToastUtils } from '../shared/util/util';
import { BaseComponent } from '../shared/base.component';

@Component({
  moduleId: module.id,
  selector: 'destination-detail',
  template: `
    <h2>Destination detail</h2>

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
export class DestinationDetailComponent extends BaseComponent implements OnInit {

  selectedDestination: Destination;

  constructor(public destinationService: DestinationService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }

  saveDestination(destination: Destination) {
    this.loadingService.startLoading();

    if (destination) {
      this.destinationService.update(destination)
        .finally(this.loadingService.stopLoading.bind(this.loadingService))
        .subscribe(
          res => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeDestination(id: number) {
    this.loadingService.startLoading();

    this.destinationService.remove(id)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        res => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  back() {
    this.router.navigate(['/client/destination']);
  }

  private loadData() {
    this.loadingService.startLoading();

    this.route.data
      .subscribe((data: {destination: Destination}) => {
        this.selectedDestination = data.destination;
        this.loadingService.stopLoading();
      });
  }
}
