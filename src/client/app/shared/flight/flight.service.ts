import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import {Constants} from "../config/app.constants";
import {Pagination, DepartureFilter, Sort} from "../util";
import {DestinationService} from "../destination/destination.service";
import {Config} from "../config/env.config";

// const endpoint = 'flights';
// const apiUrl = '/api';
const apiUrl = Config.API;
const endpoint = 'flight';

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
      this.options.headers.set(Constants.headers.xOrder, `${sort.field}:${sort.order}`);
    } else {
      if (this.options.headers.get(Constants.headers.xOrder)) {
        this.options.headers.delete(Constants.headers.xOrder);
      }
    }

    if (filter && filter.from && filter.to) {
      this.options.headers.set(Constants.headers.xFilter, `dateOfDepartureFrom=${filter.from},dateOfDepartureTo=${filter.to}`);
    } else {
      if (this.options.headers.get(Constants.headers.xFilter)) {
        this.options.headers.delete(Constants.headers.xFilter);
      }
    }

    if (pagination && pagination.base) {
      this.options.headers.set(Constants.headers.xBase, pagination.base + '');
      this.options.headers.set(Constants.headers.xOffset, (pagination.offset) + '');
    } else {
      if (this.options.headers.get(Constants.headers.xBase)) {
        this.options.headers.delete(Constants.headers.xBase);
      }
      if (this.options.headers.get(Constants.headers.xOffset)) {
        this.options.headers.delete(Constants.headers.xOffset);
      }
    }

    let totalCount: number;

    return Observable.forkJoin(
      this.http.get(`${apiUrl}/${endpoint}`, this.options)
        .map((res: Response) => {
          totalCount = +res.headers.get(Constants.headers.xCount);
          return res.json();
        }),
      this.destinationService.getAll(null)
      )
      .map(res => {
        let flights: Flight[] = res[0];

        let destinations: Destination[] = res[1];

        flights.forEach((f: Flight) => {
          destinations.forEach(d => {
            if (f.from === d.id) f.fromName = d.name;
            if (f.to === d.id) f.toName = d.name;
          });
        });

        return flights;
      })
      .map((res) => [res, totalCount])
      .catch(this.handleError);
  }

  getOne(id: number): Observable<Flight> {
    return this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  create(flight: Flight): Observable<Response> {
    this.deleteProperties(flight);
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(flight), this.options)
      .catch(this.handleError);
  }

  update(flight: Flight): Observable<Response> {
    const id = flight.id;
    this.deleteProperties(flight);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(flight), this.options)
      .catch(this.handleError);
  }

  remove(id: number): Observable<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .catch(this.handleError);
  }

  private deleteProperties(flight: Flight) {
    delete flight.id; // ***FIXME posilat pouze, kdyz je zaroven vytvorena destination
    delete flight.url;
    // delete flight.distance;
    // delete flight.price;
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

