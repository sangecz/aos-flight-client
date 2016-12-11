import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Constants } from '../config/app.constants';
import { Sort } from '../forms/sort/sort';
import { Config } from '../config/env.config';
import { HttpClientService } from '../http-client/http-client.service';

const apiUrl = Config.API;
const endpoint = 'destination';

@Injectable()
export class DestinationService {

  headers: Headers;

  constructor(private httpClient: HttpClientService) {
    this.headers = new Headers();
  }

  /**
   * @param sort 1 == asc ... -1 == desc
   */
  getAll(sort: Sort): Observable<Destination[]> {
    if (sort && sort.order) {
      this.headers.set(Constants.headers.xOrder, `${sort.order}`);
    } else {
      if (this.headers.get(Constants.headers.xOrder)) {
        this.headers.delete(Constants.headers.xOrder);
      }
    }

    return this.httpClient.getAll(`${apiUrl}/${endpoint}`, this.headers, false)
      .map((res: Response) => res.json());
  }

  getOne(id: number): Observable<Destination> {
    return this.httpClient.getOne(`${apiUrl}/${endpoint}/${id}`, null, false)
      .map((res: Response) => res.json());
  }

  create(destination: Destination): Observable<Response> {
    this.deleteProperties(destination);
    return this.httpClient.create(`${apiUrl}/${endpoint}`, JSON.stringify(destination), true);
  }

  update(destination: Destination): Observable<Response> {
    const id = destination.id;
    this.deleteProperties(destination);

    return this.httpClient.update(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(destination), null, true);
  }

  remove(id: number): Observable<Response> {
    return this.httpClient.remove(`${apiUrl}/${endpoint}/${id}`, true);
  }

  private deleteProperties(destination: Destination) {
    delete destination.id;
    delete destination.url;
  }

}

