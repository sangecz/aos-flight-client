import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {ReservationService} from "../shared/reservation/reservation.service";
import {AuthService} from "../shared/auth/auth.service";


@Component({
  moduleId: module.id,
  selector: 'sd-reservation',
  templateUrl: 'reservation.component.html',
  styleUrls: ['reservation.component.css'],
})
export class ReservationComponent implements OnInit {

  errorMessage: string;
  createdReservation : Reservation;
  reservations: Reservation[] = [];
  selectedReservation: Reservation;

  constructor(
    public reservationService: ReservationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAll()
      .subscribe(
        (res: any) => this.reservations = <Reservation[]>res[0],
        err => this.errorMessage = err
      );
  }

  addReservation(reservation: Reservation)  {
    this.reservationService.create(reservation)
      .subscribe(
        res => {
          this.getReservations();
          this.createdReservation = res;
        },
        err => this.errorMessage = err
      );
  }

  selectReservation(reservation: Reservation){
    // this.selectedReservation = reservation;
    this.router.navigate(['/client/reservation', reservation.id]);
  }

}
