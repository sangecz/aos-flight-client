import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { ReservationService } from '../shared/reservation/reservation.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastUtils } from '../shared/util/util';
import { BaseComponent } from '../shared/base.component';
import { FlightService } from '../shared/flight/flight.service';


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
      <h5>Last created reservation:</h5>
      <span>reservation id: <b>{{createdReservation?.id}}</b></span><br/>
      <span> password: <b>{{createdReservation?.password}}</b></span><br />
      <span> reservation link: <b>{{getReservationLink(createdReservation)}}</b></span><br />
      <button (click)="goToDetail(createdReservation.id, createdReservation.password)">Edit reservation</button>
    </div>
    
    <reservation-list
      [visible]="authService.isAdmin || authService.isManager"
      [reservations]="reservations"
      (onReservationSelected)="selectReservation($event)"
      (onDownloadTicket)="eTicket($event)">
    </reservation-list>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0 16px;
    }
  `]
})
export class ReservationComponent extends BaseComponent implements OnInit {

  flights: Flight[];
  createdReservation: Reservation;
  reservations: Reservation[];
  selectedReservation: Reservation;

  constructor(public reservationService: ReservationService,
              private router: Router,
              public authService: AuthService,
              private toast: ToastyService,
              private route: ActivatedRoute,
              private flightService: FlightService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }

  addReservation(reservation: Reservation) {
    this.loadingService.startLoading();

    this.reservationService.create(reservation)
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        res => {
          if (this.authService.isAdmin || this.authService.isManager) {
            this.getReservations();
          }
          this.createdReservation = res;
        },
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  selectReservation(reservation: Reservation) {
    this.goToDetail(reservation.id, reservation.password);
  }

  goToDetail(id: number, pwd: string) {
    this.router.navigate(['/client/reservation', id, pwd]);
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
        },
        err => this.toast.error(ToastUtils.set(err))
      );
  }

  getReservationLink(reservation: Reservation) {
    if (!reservation) return '';

    return `${window.location.href}/${reservation.id}/${reservation.password}`;
  }

  private loadData() {
    this.loadingService.startLoading();

    this.route.data
      .subscribe((data: {obj: {flights: Flight[], reservations: Reservation[]}}) => {
        this.flights = data.obj.flights;
        this.reservations = this.mapReservationsToFlights(data.obj.reservations);
        this.loadingService.stopLoading();
      });
  }

  private mapReservationsToFlights(reservations: Reservation[]) {
    if (!reservations) return [];

    reservations.forEach((r: Reservation) => {
      this.flights.forEach((f: Flight) => {
        if (r.flight === f.id) r.flightName = f.name;
      });
    });

    return reservations;
  }

  private getReservations() {
    this.loadingService.startLoading();

    this.reservationService.getAll()
      .finally(this.loadingService.stopLoading.bind(this.loadingService))
      .subscribe(
        (res: Reservation[]) => {

          this.loadingService.startLoading();

          this.flightService.getAll(null, null, null)
            .finally(this.loadingService.stopLoading.bind(this.loadingService))
            .subscribe(
              res2 => {
                this.flights = res2[0];
                this.reservations = this.mapReservationsToFlights(res);
              },
              err => this.toast.error(ToastUtils.set(err))
            );
        },
        err => this.toast.error(ToastUtils.set(err))
      );
  }
}

