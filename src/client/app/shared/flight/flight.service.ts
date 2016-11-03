import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';

import {Constants} from "../config/app.constants";
import {Pagination, DepartureFilter, Sort} from "../util";
import {DestinationService} from "../destination/destination.service";

const endpoint = 'flights';
const apiUrl = '/api';

@Injectable()
export class FlightService {

  options: RequestOptions;

  constructor(private http: Http,
              private destinationService: DestinationService) {
    this.options = new RequestOptions({headers: this.createHeaders()});
  }

  /**
   * @param sort.order 1 == asc ... -1 == desc
   */
  getAll(sort: Sort, filter: DepartureFilter, pagination: Pagination): Observable<any[]> {
    if (sort && sort.order) {
      this.options.headers.append(Constants.headers.xOrder, `${sort.field}:${sort.order}`);
    }

    if (filter && filter.from && filter.to) {
      this.options.headers.append(Constants.headers.xFilter, `dateOfDepartureFrom=${filter.from},dateOfDepartureTo=${filter.to}`);
    }

    if (pagination && pagination.base && pagination.offset) {
      this.options.headers.append(Constants.headers.xBase, pagination.base + '');
      this.options.headers.append(Constants.headers.xOffset, pagination.offset + '');
    }

    const totalCount = 13;

    return Observable.forkJoin(
      this.http.get(`${apiUrl}/${endpoint}`, this.options).map((res: Response) => res.json().data),
      this.destinationService.getAll(null)
      )
      .map(res => {
        let flights: Flight[] = res[0];
        let destinations: Destination[] = res[1];

        flights.forEach((f: Flight) => {
          destinations.forEach(d => {
            if(f.from === d.id) f.fromName = d.name;
            if(f.to === d.id) f.toName = d.name;
          });
        });

        return flights;
      })
      .map((res) => [res, totalCount]);
  }

  getOne(id: number): Promise<Flight> {
    return this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise()
      .then((res: Response) => res.json().data);
  }

  create(flight: Flight): Promise<Response> {
    this.deleteProperties(flight);
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(flight), this.options)
      .toPromise();
  }

  update(flight: Flight): Promise<Response> {
    const id = flight.id;
    this.deleteProperties(flight);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(flight), this.options)
      .toPromise()
  }

  remove(id: number): Promise<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise();
  }

  private deleteProperties(flight: Flight) {
    delete flight.id; // FIXME posilat pouze, kdyz je zaroven vytvorena destination
    delete flight.url;
    delete flight.distance;
    delete flight.price;
    delete flight.fromName;
    delete flight.toName;
  }

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

