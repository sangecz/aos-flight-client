import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastUtils } from '../shared/util/util';
import { FlightService } from '../shared/flight/flight.service';
import { StoreService } from '../shared/util/store.service';


@Component({
  moduleId: module.id,
  selector: 'sd-reservation',
  template: `
    <h2>Add reservation</h2>
    
    <reservation-form
      [flights]="flights"
      [reservation]="selectedReservation"
      (onReservationChange)="addReservation($event)">
    </reservation-form>
    
    <div [hidden]="!createdReservation">
      <!-- TODO pouzit heslo pro vstup do rezervace -->
      <h5>Last created reservation:</h5>
      <a href="#" routerLink="/client/reservation/{{createdReservation?.id}}">reservation link</a><br/>
      <span> password: {{createdReservation?.password}}</span>
    </div>
    
    <reservation-list
      [visible]="authService.isAdmin || authService.isManager"
      [reservations]="reservations"
      (onReservationSelected)="selectReservation($event)">
    </reservation-list>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class ReservationComponent implements OnInit {

  flights: Flight[];
  createdReservation: Reservation;
  reservations: Reservation[];
  selectedReservation: Reservation;

  constructor(public reservationService: ReservationService,
              private router: Router,
              public authService: AuthService,
              private toast: ToastyService,
              private flightService: FlightService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    this.getReservations();
    this.getFlights();
  }

  getReservations() {
    this.reservationService.getAll()
      .subscribe(
        (res: any) => this.reservations = <Reservation[]>res[0],
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  addReservation(reservation: Reservation) {
    this.reservationService.create(reservation)
      .subscribe(
        res => {
          this.getReservations();
          this.createdReservation = res;
        },
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  selectReservation(reservation: Reservation) {
    this.storeService.set('pwd', reservation.password);
    this.router.navigate(['/client/reservation', reservation.id]);
  }

  getFlights() {
    this.flightService.getAll(null, null, null)
      .subscribe(
        res => {
          this.flights = res[0];
        },
        err => this.toast.error(ToastUtils.set(err))
      );
  }
}
