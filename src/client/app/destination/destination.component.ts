import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { DestinationService } from '../shared/index';
import { SortService } from '../shared/sort/sort.service';
import { Observable } from 'rxjs/Observable';
import { DestinationState, DESTINATION_TAG } from '../shared/destination/destination.state';
import { ToastUtils } from '../shared/util/util';
import { AuthService } from '../shared/auth/auth.service';
import { BaseComponent } from '../shared/base.component';

const destinationSortFields = {
  name: 'name'
};

/**
 * ngrx/store used on sort only
 */
@Component({
  moduleId: module.id,
  selector: 'sd-destination',
  template: `

    <div *ngIf="authService.isAdmin">
      <h2>Add destination</h2>
      <destination-form 
        [destination]="selectedDestination" 
        (onDestinationChange)="addDestination($event)">
      </destination-form>
    </div>
    
    <destination-list
      [destinations]="destinations"
      [sortClass]="(state$ | async)?.sort?.order"
      (onDestinationSelected)="selectDestination($event)"
      (onSortChanged)="changeSort()"
    ></destination-list>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class DestinationComponent extends BaseComponent implements OnInit, OnDestroy {
  destinations: Destination[];

  selectedDestination: Destination;
  state$: Observable<DestinationState>;
  constructor(public destinationService: DestinationService,
              private router: Router,
              private sortService: SortService,
              private toast: ToastyService,
              private authService: AuthService) {
    super();
    this.state$ = <Observable<DestinationState>> sortService.registerSort(DESTINATION_TAG, destinationSortFields.name);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getDestinations();
  }

  getDestinations() {
    this.subscription = this.state$.subscribe(
      state => {
        this.destinationService.getAll(state.sort)
          .subscribe(
            destinations => this.destinations = destinations,
            err => this.toast.error(ToastUtils.set(err))
          );
      });
  }

  addDestination(destination: Destination) {
    this.destinationService.create(destination)
      .subscribe(
        res => this.getDestinations(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  selectDestination(destination: Destination) {
    this.router.navigate(['/client/destination', destination.id]);
  }

  changeSort() {
    this.sortService.toggleSort(DESTINATION_TAG, destinationSortFields.name);
  }

}
