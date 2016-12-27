/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { reservationStates } from './reservation-states';
import { ToastUtils } from '../shared/util/util';
import { BaseComponent } from '../shared/base.component';

@Component({
  moduleId: module.id,
  selector: 'reservation-detail',
  template: `
    <h2>Reservation detail</h2>
    
    <print-btn 
      *ngIf="showPrintBtn()" 
      (onPrintClicked)="eTicket(selectedReservation)">  
    </print-btn>
     <email-btn 
      *ngIf="showPrintBtn()" 
      (onSendToEmailClicked)="emailTicket(selectedReservation, $event)">  
    </email-btn>
    
    <reservation-form
      [reservation]="selectedReservation"
      [flights]="flights"
      [isDetail]="true"
      (onReservationChange)="saveReservation($event)"
      (onRemove)="removeReservation($event)"
      (onBack)="back($event)">
    </reservation-form>
    
    <button type="button" *ngIf="showPayBtn()" (click)="payForReservation()">Pay</button>
    
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class ReservationDetailComponent extends BaseComponent implements OnInit {

  flights: Flight[];
  selectedReservation: Reservation;

  constructor(public reservationService: ReservationService,
              public route: ActivatedRoute,
              public router: Router,
              private toast: ToastyService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }

  saveReservation(reservation: Reservation) {
    this.loadingService.startLoading();

    if (reservation) {
      this.reservationService.update(reservation)
        .finally(this.loadingService.stopLoading.bind(this.loadingService))
        .subscribe(
          () => this.back(),
          err => this.toast.error(ToastUtils.set(err))
        );
    }
  }

  removeReservation(id: number) {
    this.loadingService.startLoading();

    this.reservationService.remove(id)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        () => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  payForReservation() {
    this.loadingService.startLoading();

    this.reservationService.pay(this.selectedReservation.id)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        () => this.back(),
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  eTicket(reservation: Reservation) {
    this.loadingService.startLoading();

    this.reservationService.downloadTicket(reservation.id, reservation.password)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        res => {
          let a = document.createElement('a');
          a.href = 'data:attachment/text,' + encodeURIComponent(res);
          a.target = '_blank';
          a.download = `reservation_${reservation.id}.txt`;

          document.body.appendChild(a);
          a.click();
          this.loadingService.stopLoading();
        },
        err => {
          this.loadingService.stopLoading();
          this.toast.error(ToastUtils.set(err));
        }
      );
  }

  emailTicket(reservation: Reservation, email: string) {
    reservation.email = email;
    this.loadingService.startLoading();

    this.reservationService.sendToEmailTicket(reservation.id, reservation.password, reservation.email)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        res => {
          this.loadingService.stopLoading();
        },
        err => {
          this.loadingService.stopLoading();
          this.toast.error(ToastUtils.set(err));
        }
      );
  }

  back() {
    this.router.navigate(['/client/reservation']);
  }

  showPayBtn(): boolean {
    return this.selectedReservation && this.selectedReservation.state === reservationStates.NEW;
  }

  showPrintBtn(): boolean {
    return this.selectedReservation && this.selectedReservation.state === reservationStates.PAID;
  }

  private loadData() {
    this.loadingService.startLoading();

    this.route.data
      .subscribe((data: {obj: {flights: Flight[], reservation: Reservation}}) => {
        this.flights = data.obj.flights;
        this.selectedReservation = data.obj.reservation;
        this.loadingService.stopLoading();
      });
  }

}
