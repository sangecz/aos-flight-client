import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Config } from '../config/env.config';
import { reservationStates } from '../../reservation/reservation-states';
import { Constants } from '../config/app.constants';
import { FlightService } from '../flight/flight.service';
import { HttpClientService } from '../http-client/http-client.service';

const apiUrl = Config.API;
const endpoint = 'reservation';

@Injectable()
export class ReservationService {

  private headers: Headers;

  constructor(private flightService: FlightService,
              private httpClient: HttpClientService) {
    this.headers = new Headers();
  }

  getAll(): Observable<any> {
    return Observable.forkJoin(
      this.httpClient.getAll(`${apiUrl}/${endpoint}`, null, true).map((res: Response) => res.json()),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        let reservations: Reservation[] = res[0];
        let flights: Flight[] = res[1][0];

        reservations.forEach((r: Reservation) => {
          flights.forEach((f: Flight) => {
            if (r.flight === f.id) r.flightName = f.name;
          });
        });

        return [reservations, flights];
      });
  }

  getOne(id: number, password: string): Observable<Reservation> {

    this.headers.append(Constants.headers.xPassword, password);

    return Observable.forkJoin(
      // FIXME auth = false, jen x-pwd
      this.httpClient.getOne(`${apiUrl}/${endpoint}/${id}`, this.headers, true).map((res: Response) => res.json()),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        let reservation: Reservation = res[0];
        let flights: Flight[] = res[1][0];

        flights.forEach((f: Flight) => {
          if (reservation.flight === f.id) reservation.flightName = f.name;
        });

        return reservation;
      });
  }

  create(reservation: Reservation): Observable<Reservation> {
    this.deleteProperties(reservation);
    delete reservation.state; // na serveru prirazen stav NEW
    return this.httpClient.create(`${apiUrl}/${endpoint}`, JSON.stringify(reservation), false)
      .map((res: Response) => res.json())
  }

  update(reservation: Reservation, password: string): Observable<Response> {
    const id = reservation.id;
    this.deleteProperties(reservation);
    reservation.state = reservationStates.CANCELED;

    this.headers.append(Constants.headers.xPassword, password);
    // FIXME auth = false, jen x-pwd
    return this.httpClient.update(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(reservation), this.headers, true);
  }

  remove(id: number): Observable<Response> {
    return this.httpClient.remove(`${apiUrl}/${endpoint}/${id}`, true)
  }

  pay(id: number): Observable<Response> {
    return this.httpClient.create(`${apiUrl}/${endpoint}/${id}/payment`, JSON.stringify({cardNo: '1234567812345678'}), false);
  }

  private deleteProperties(reservation: Reservation) {
    delete reservation.id;
    delete reservation.url;
    delete reservation.created;
    delete reservation.password;
    delete reservation.flightName;
  }
}
