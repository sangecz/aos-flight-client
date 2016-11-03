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
        .then(reservation => this.selectedReservation = reservation)
        .catch(this.back.bind(this));
    })
  }

  saveReservation(reservation: Reservation) {
    if(reservation) {
      this.reservationService.update(reservation)
        .then(this.back.bind(this));
    }
  }

  removeReservation(id: number) {
    this.reservationService.remove(id)
      .then(this.back.bind(this))
  }

  payForReservation() {
    this.reservationService.pay(this.selectedReservation.id)
      .then(this.back.bind(this));
  }

  back() {
    this.router.navigate(['/reservation']);
  }

  showPayBtn(): boolean{
    return this.selectedReservation && this.selectedReservation.state === reservationStates.NEW;
  }

}