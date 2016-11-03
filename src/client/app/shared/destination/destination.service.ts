import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {Constants} from "../config/app.constants";
import {Sort} from "../util/sort";

const endpoint = 'destinations';
const apiUrl = '/api';

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
    if(sort && sort.order) {
      this.options.headers.append(Constants.headers.xOrder, `${sort.field}:${sort.order}`);
    }

    return this.http.get(`${apiUrl}/${endpoint}`, this.options)
      .map((res: Response) => res.json().data);
  }

  getOne(id: number): Promise<Destination> {
    return this.http.get(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise()
      .then((res: Response) => res.json().data);
  }

  create(destination: Destination): Promise<Response> {
    this.deleteProperties(destination);
    return this.http.post(`${apiUrl}/${endpoint}`, JSON.stringify(destination), this.options)
      .toPromise();
  }

  update(destination: Destination): Promise<Response> {
    const id = destination.id;
    this.deleteProperties(destination);

    return this.http.put(`${apiUrl}/${endpoint}/${id}`, JSON.stringify(destination), this.options)
      .toPromise()
  }

  remove(id: number): Promise<Response> {
    return this.http.delete(`${apiUrl}/${endpoint}/${id}`, this.options)
      .toPromise();
  }

  private deleteProperties(destination: Destination) {
    delete destination.id;
    delete destination.url;
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

