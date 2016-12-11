import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Config } from '../config/env.config';
import { reservationStates } from '../../reservation/reservation-states';
import { Constants } from '../config/app.constants';
import { HttpClientService } from '../http-client/http-client.service';

const apiUrl = Config.API;
const endpoint = 'reservation';
const endpointSoap = 'ws/downloadTicket';

@Injectable()
export class ReservationService {

  private headers: Headers;

  constructor(private httpClient: HttpClientService) {
    this.headers = new Headers();
  }

  getAll(): Observable<any> {
    return this.httpClient.getAll(`${apiUrl}/${endpoint}`, null, true)
      .map((res: Response) => res.json());
  }

  getOne(id: number, password: string): Observable<Reservation> {

    this.headers.set(Constants.headers.xPassword, password);

    return this.httpClient.getOne(`${apiUrl}/${endpoint}/${id}`, this.headers, false)
      .map((res: Response) => res.json());
  }

  create(reservation: Reservation): Observable<Reservation> {
    this.deleteProperties(reservation);
    delete reservation.state; // na serveru prirazen stav NEW
    return this.httpClient.create(`${apiUrl}/${endpoint}`, JSON.stringify(reservation), false)
      .map((res: Response) => res.json());
  }

  update(reservation: Reservation): Observable<Response> {
    const id = reservation.id;
    const pwd = reservation.password;
    this.deleteProperties(reservation);
    reservation.state = reservationStates.CANCELED;

    this.headers.set(Constants.headers.xPassword, pwd);
    return this.httpClient.update(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(reservation), this.headers, false);
  }

  remove(id: number): Observable<Response> {
    return this.httpClient.remove(`${apiUrl}/${endpoint}/${id}`, true);
  }

  pay(id: number): Observable<Response> {
    return this.httpClient.create(`${apiUrl}/${endpoint}/${id}/payment`, JSON.stringify({cardNo: '1234567812345678'}), false);
  }

  downloadTicket(id: number, password: string) {
    const body = this.getSoapBody(id);
    return this.httpClient.soapPost(`${apiUrl}/${endpointSoap}`, body, password)
      .map(res => {
        const txt = res.split('\n'); // parses soap resp.
        return txt[txt.length - 2];  // second line from the end contains eticket
      });
  }

  private getSoapBody(id: number) {
    return `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.web.airline.aos.cvut.cz/">
       <soapenv:Header/>
       <soapenv:Body>
          <ws:downloadTicket>
             <reservationId>${id}</reservationId>
          </ws:downloadTicket>
       </soapenv:Body>
      </soapenv:Envelope>
    `;
  }

  private deleteProperties(reservation: Reservation) {
    delete reservation.id;
    delete reservation.created;
    delete reservation.password;
    delete reservation.flightName;
  }
}
