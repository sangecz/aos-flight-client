import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Constants } from '../config/app.constants';
import { DestinationService } from '../destination/destination.service';
import { Config } from '../config/env.config';
import { Sort } from '../sort/sort';
import { DepartureFilter } from '../filter/filter';
import { Pagination } from '../pagination/pagination';
import { HttpClientService } from '../http-client/http-client.service';

const apiUrl = Config.API;
const endpoint = 'flight';

@Injectable()
export class FlightService {

  headers: Headers;

  constructor(private httpClient: HttpClientService,
              private destinationService: DestinationService) {
    this.headers = new Headers();
  }

  /**
   * @param sort.order 1 == asc ... -1 == desc
   */
  getAll(sort: Sort, filter: DepartureFilter, pagination: Pagination): Observable<any[]> {
    this.setSortHeaders(sort);
    this.setFilterHeaders(filter);
    this.setPaginationHeaders(pagination);

    let totalCount: number;

    return Observable.forkJoin(
      this.httpClient.getAll(`${apiUrl}/${endpoint}`, this.headers, false)
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

        return [flights, totalCount];
      });
  }

  getOne(id: number): Observable<Flight> {
    return this.httpClient.getOne(`${apiUrl}/${endpoint}/${id}`, null, false)
      .map((res: Response) => res.json());
  }

  create(flight: Flight): Observable<Response> {
    this.deleteProperties(flight);
    return this.httpClient.create(`${apiUrl}/${endpoint}`, JSON.stringify(flight), true);
  }

  update(flight: Flight): Observable<Response> {
    const id = flight.id;
    this.deleteProperties(flight);

    return this.httpClient.update(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(flight), null, true);
  }

  remove(id: number): Observable<Response> {
    return this.httpClient.remove(`${apiUrl}/${endpoint}/${id}`, true)
  }

  private setPaginationHeaders(pagination: Pagination) {
    if (pagination && pagination.base) {
      this.headers.set(Constants.headers.xBase, pagination.base + '');
      this.headers.set(Constants.headers.xOffset, (pagination.offset) + '');
    } else {
      if (this.headers.get(Constants.headers.xBase)) {
        this.headers.delete(Constants.headers.xBase);
      }
      if (this.headers.get(Constants.headers.xOffset)) {
        this.headers.delete(Constants.headers.xOffset);
      }
    }
  }

  private setFilterHeaders(filter: DepartureFilter) {
    if (filter && (filter.from || filter.to)) {
      // gets JSON date format without quotes
      let from = JSON.stringify(filter.from);
      let to = JSON.stringify(filter.to);
      from = from.slice(1, from.length - 1);
      to = to.slice(1, to.length - 1);

      if (filter.from && filter.to) {
        this.headers.set(Constants.headers.xFilter, `dateOfDepartureFrom=${from},dateOfDepartureTo=${to}`);
      } else if (filter.from && !filter.to) {
        this.headers.set(Constants.headers.xFilter, `dateOfDepartureFrom=${from}`);
      } else if (!filter.from && filter.to) {
        this.headers.set(Constants.headers.xFilter, `dateOfDepartureTo=${to}`);
      }
    } else {
      if (this.headers.get(Constants.headers.xFilter)) {
        this.headers.delete(Constants.headers.xFilter);
      }
    }
  }

  private setSortHeaders(sort: Sort) {
    if (sort && sort.order) {
      this.headers.set(Constants.headers.xOrder, `${sort.field}:${sort.order}`);
    } else {
      if (this.headers.get(Constants.headers.xOrder)) {
        this.headers.delete(Constants.headers.xOrder);
      }
    }
  }

  private deleteProperties(flight: Flight) {
    delete flight.id;
    delete flight.url;
    delete flight.fromName;
    delete flight.toName;
  }
}
