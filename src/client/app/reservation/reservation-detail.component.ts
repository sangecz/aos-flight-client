/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {ReservationService} from "../shared/reservation/reservation.service";
import {reservationStates} from "./reservation-states";

@Component({
  moduleId: module.id,
  selector: 'reservation-detail',
  templateUrl: 'reservation-detail.component.html'
})
export class ReservationDetailComponent implements OnInit {

  errorMessage: string;
  selectedReservation: Reservation;

  constructor(
    public reservationService: ReservationService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // + konvertuje string na number
      this.reservationService.getOne(id)
        .subscribe(
          reservation => this.selectedReservation = reservation,
          err => this.errorMessage = err
        );
    })
  }

  saveReservation(reservation: Reservation) {
    if(reservation) {
      this.reservationService.update(reservation)
        .subscribe(
          () => this.back(),
          err => this.errorMessage = err
        );
    }
  }

  removeReservation(id: number) {
    this.reservationService.remove(id)
      .subscribe(
        () => this.back(),
        err => this.errorMessage = err
      );
  }

  payForReservation() {
    this.reservationService.pay(this.selectedReservation.id)
      .subscribe(
        () => this.back(),
        err => this.errorMessage = err
      );
  }

  back() {
    this.router.navigate(['/reservation']);
  }

  showPayBtn(): boolean{
    return this.selectedReservation && this.selectedReservation.state === reservationStates.NEW;
  }

}