import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Constants } from '../config/app.constants';
import { Sort } from '../sort/sort';
import { Config } from '../config/env.config';

const apiUrl = Config.API;
const endpoint = 'destination';

@Injectable()
export class DestinationService {

  options: RequestOptions;

  constructor(private http: Http) {
    this.options = new RequestOptions({headers: this.createHeaders()});
  }

  /**
   * @param sort 1 == asc ... -1 == desc
   */
  getAll(sort: Sort): Observable<Destination[]> {
    if (sort && sort.order) {
      this.options.headers.set(Constants.headers.xOrder, `${sort.order}`);
    } else {
      if (this.options.headers.get(Constants.headers.xOrder)) {
        this.options.headers.delete(Constants.headers.xOrder);
      }
    }

    return this.http.get(`${apiUrl}/${endpoint}`, this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getOne(id: number): Observable<Destination> {
    return this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  create(destination: Destination): Observable<Response> {
    this.deleteProperties(destination);
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(destination), this.options)
      .catch(this.handleError);
  }

  update(destination: Destination): Observable<Response> {
    const id = destination.id;
    this.deleteProperties(destination);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(destination), this.options)
      .catch(this.handleError);
  }

  remove(id: number): Observable<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .catch(this.handleError);
  }

  private deleteProperties(destination: Destination) {
    delete destination.id;
    delete destination.url;
  }

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

