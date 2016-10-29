import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import {Config} from "../config/env.config";
import 'rxjs/add/operator/toPromise';
import {reservationStates} from "../../reservation/reservation-states";
import {CONSTANTS} from "../config/app.constants";

const endpoint = 'reservations';
const apiUrl = '/app';

@Injectable()
export class ReservationService {

  options: RequestOptions;

  constructor(private http: Http) {
    this.options = new RequestOptions({headers: this.createHeaders()});
  }

  getAll(): Promise<Reservation[]> {
    return this.http.get(`${apiUrl}/${endpoint}`, this.options)
      .toPromise()
      .then((res: Response) => res.json().data);
  }

  // TODO pridat hlavicku: X-Password, jak se user dozvi id pro zobrazeni, kdyz nemuze listovat?
  getOne(id: number): Promise<Reservation> {
    return this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise()
      .then((res: Response) => res.json().data);
  }

  create(reservation: Reservation): Promise<Response> {
    this.deleteProperties(reservation);
    delete reservation.state; // na serveru prirazen stav NEW
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(reservation), this.options)
      .toPromise();
  }

  update(reservation: Reservation): Promise<Response> {
    const id = reservation.id;
    const password: string = reservation.password;
    this.deleteProperties(reservation);
    reservation.state = reservationStates.CANCELED;

    this.options.headers.append(CONSTANTS.headers.xPassword, password);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(reservation), this.options)
      .toPromise()
  }

  remove(id: number): Promise<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise();
  }

  pay(id: number): Promise<Response> {
    return this.http.post(`${apiUrl}/${endpoint}/${id}/payment`, JSON.stringify({cardNumber: 1234567812345678}), this.options)
      .toPromise();
  }

  private deleteProperties(reservation: Reservation) {
    delete reservation.id;
    delete reservation.url;
    delete reservation.created;
    delete reservation.password;
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to getAll a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private createHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }
}

