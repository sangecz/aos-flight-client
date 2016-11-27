/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { reservationStates } from './reservation-states';
import { ToastUtils } from '../shared/util/util';

@Component({
  moduleId: module.id,
  selector: 'reservation-detail',
  template: `
    <h2>Cancel reservation</h2>
    
    <reservation-form
      [reservation]="selectedReservation"
      [isDetail]="true"
      (onReservationChange)="saveReservation($event)"
      (onRemove)="removeReservation($event)"
      (onBack)="back($event)">
    </reservation-form>
    
    <button type="button" *ngIf="showPayBtn()" (click)="payForReservation()">Pay</button>
  `
})
export class ReservationDetailComponent implements OnInit {

  selectedReservation: Reservation;

  constructor(public reservationService: ReservationService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // + konvertuje string na number
      this.reservationService.getOne(id)
        .subscribe(
          reservation => this.selectedReservation = reservation,
          err => this.toast.error(ToastUtils.set(err))
        );
    });
  }

  saveReservation(reservation: Reservation) {
    if (reservation) {
      this.reservationService.update(reservation)
        .subscribe(
          () => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeReservation(id: number) {
    this.reservationService.remove(id)
      .subscribe(
        () => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  payForReservation() {
    this.reservationService.pay(this.selectedReservation.id)
      .subscribe(
        () => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  back() {
    this.router.navigate(['/client/reservation']);
  }

  showPayBtn(): boolean {
    return this.selectedReservation && this.selectedReservation.state === reservationStates.NEW;
  }

}
