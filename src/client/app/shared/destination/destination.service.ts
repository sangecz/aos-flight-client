import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import {Config} from "../config/env.config";
import 'rxjs/add/operator/toPromise';

/**
 * This class provides the NameList service with methods to read destinations and add destinations.
 */
@Injectable()
export class DestinationService {

  options: RequestOptions;

  /**
   * Creates a new DestinationService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
    this.options = new RequestOptions({headers: this.createHeaders()});
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<Destination[]> {
    return this.http.get(Config.API + '/destination', this.options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDestination(id: number): Promise<Destination> {
    return this.http.get(Config.API + `/destination/${id}`, this.options)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  create(destination: Destination): Promise<Response> {
    delete destination.id;
    delete destination.url;
    return this.http.post(Config.API + '/destination', JSON.stringify(destination), this.options)
      // .map((res: Response) => res.json())
      .toPromise()
      .catch(this.handleError);
  }

  update(destination: Destination): Promise<Response> {
    const id = destination.id;
    delete destination.id;
    delete destination.url;
    return this.http.put(Config.API + `/destination/${id}`, JSON.stringify(destination), this.options)
      .toPromise()
      // .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  remove(id: number): Promise<Response> {
    return this.http.delete(Config.API + `/destination/${id}`, this.options)
      .toPromise()
      // .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private createHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    return headers;
  }
}

