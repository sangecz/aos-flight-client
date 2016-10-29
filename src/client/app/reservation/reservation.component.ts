import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {ReservationService} from "../shared/reservation/reservation.service";

// TODO pridat PAY tlacitko

@Component({
  moduleId: module.id,
  selector: 'sd-reservation',
  templateUrl: 'reservation.component.html',
  styleUrls: ['reservation.component.css'],
})
export class ReservationComponent implements OnInit {

  errorMessage: string;
  reservations: any[] = [];
  selectedReservation: Reservation = {
    id: null,
    flight: null,
    seats: null,
    password: null,
    state: null,
    created: null,
    url: null
  };

  constructor(
    public reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAll()
      .then(reservations => this.reservations = reservations)
      .catch(error => this.errorMessage = <any>error);
  }

  addReservation(reservation: Reservation)  {
    this.reservationService.create(reservation)
      .then(this.getReservations.bind(this))
      .catch(err => {
        this.errorMessage = <any>err;
        setTimeout(() => this.errorMessage = '', 1000);
      });

  }

  selectReservation(reservation: Reservation){
    // this.selectedReservation = reservation;
    this.router.navigate([reservation.url]);
  }

}
