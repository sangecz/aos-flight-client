/**
 * Created by sange on 04/12/2016.
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { Constants } from '../config/app.constants';

@Injectable()
export class HttpClientService {

  private options: RequestOptions;

  constructor(private http: Http,
              private authService: AuthService) {
    this.options = new RequestOptions();
  }

  getAll(url: string, headers: Headers, auth: boolean): Observable<any> {
    this.createHeaders(auth, headers);

    return this.http.get(url, this.options)
      .share()
      .catch(this.handleError);
  }

  getOne(url: string, headers: Headers, auth: boolean): Observable<any> {
    this.createHeaders(auth, headers);

    return this.http.get(url, this.options)
      .share()
      .catch(this.handleError);
  }

  create(url: string, body: any, auth: boolean): Observable<Response> {
    this.createHeaders(auth);

    return this.http.post(url, body, this.options)
      .share()
      .catch(this.handleError);
  }

  update(url: string, body: any, headers: Headers, auth: boolean): Observable<Response> {
    this.createHeaders(auth, headers);

    return this.http.put(url, body, this.options)
      .share()
      .catch(this.handleError);
  }

  remove(url: string, auth: boolean): Observable<Response> {
    this.createHeaders(auth);

    return this.http.delete(url, this.options)
      .share()
      .catch(this.handleError);
  }

  soapPost(url: string, body: string, pwd: string) {
    let opts = new RequestOptions();
    let headers = new Headers();
    headers.set('Content-Type', 'application/soap+xml');
    headers.set(Constants.headers.xPassword, pwd);
    opts.headers = headers;

    return this.http.post(url, body, opts)
      .share()
      .map(res => res.text())
      .catch(this.handleError);
  }

  private createHeaders(auth: boolean, additionalHeaders?: Headers) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (additionalHeaders) {
      additionalHeaders.keys().forEach(key => {
        headers.set(key, additionalHeaders.get(key));
      });
    }

    if (auth) {
      headers.set('Authorization', 'Basic ' + btoa(`${this.authService.username}:${this.authService.password}`));
    } else {
      headers.delete('Authorization');
    }

    this.options.headers = headers;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status;
    return Observable.throw('Error: ' + errMsg);
  }
}
