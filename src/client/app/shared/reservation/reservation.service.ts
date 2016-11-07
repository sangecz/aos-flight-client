import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import {Config} from "../config/env.config";
import {reservationStates} from "../../reservation/reservation-states";
import {Constants} from "../config/app.constants";
import {FlightService} from "../flight/flight.service";

// const endpoint = 'reservations';
// const apiUrl = '/app';
const apiUrl = Config.API;
const endpoint = 'reservation';

@Injectable()
export class ReservationService {

  options: RequestOptions;

  constructor(
    private flightService: FlightService,
    private http: Http
  ) {
    this.options = new RequestOptions({headers: this.createHeaders()});
  }

  getAll(): Observable<any> {

    return Observable.forkJoin(
      this.http.get(`${apiUrl}/${endpoint}`, this.options).map((res: Response) => res.json()),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        let flights: Flight[] = res[1][0];
        let reservations: Reservation[] = res[0];

        reservations.forEach((r: Reservation) => {
          flights.forEach((f: Flight) => {
            if(r.flight === f.id) r.flightName = f.name;
          });
        });

        return [reservations, flights];
      })
      .catch(this.handleError);
  }

  // TODO pridat hlavicku: X-Password
  getOne(id: number): Observable<Reservation> {

    return Observable.forkJoin(
      this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options).map((res: Response) => res.json()),
      this.flightService.getAll(null, null, null)
      )
      .map(res => {
        let reservation: Reservation = res[0];
        let flights: Flight[] = res[1][0];

        flights.forEach((f: Flight) => {
          if(reservation.flight === f.id) reservation.flightName = f.name;
        });

        return reservation;
      })
      .catch(this.handleError);
  }

  create(reservation: Reservation): Observable<Reservation> {
    this.deleteProperties(reservation);
    delete reservation.state; // na serveru prirazen stav NEW
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(reservation), this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(reservation: Reservation): Observable<Response> {
    const id = reservation.id;
    const password: string = reservation.password;
    this.deleteProperties(reservation);
    reservation.state = reservationStates.CANCELED;

    this.options.headers.append(Constants.headers.xPassword, password);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(reservation), this.options)
      .catch(this.handleError);
  }

  remove(id: number): Observable<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .catch(this.handleError);
  }

  pay(id: number): Observable<Response> {
    return this.http.post(`${apiUrl}/${endpoint}/${id}/payment`, JSON.stringify({cardNo: '1234567812345678'}), this.options)
      .catch(this.handleError);
  }

  private deleteProperties(reservation: Reservation) {
    delete reservation.id;
    delete reservation.url;
    delete reservation.created;
    delete reservation.password;
    delete reservation.flightName;
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status;
    return Observable.throw('Error: ' + errMsg);
  }

  private createHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }
}

