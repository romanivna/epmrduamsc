import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Request,
  RequestOptions,
  Headers,
  RequestMethod,
  URLSearchParams
} from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { SpinnerService } from '../spinner';
import { DetectBrowserService } from '../detect-browser';

interface ApiResponse<T> {
  data: T;
  headers?: Headers;
}

@Injectable()
export class ServerGetterService {
  handleError(error: Response | any) {
    let errorMessage: string;
    this.spinnerService.hide();
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${ error.status } - ${ error.statusText || '' } ${ err }`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    return Observable.throw(errorMessage);
  }

  constructor(private http: Http, private spinnerService: SpinnerService, private detectBrowserService: DetectBrowserService) { }

  public get<T>(path: string, params?: Object, showSpinner: boolean = true): Observable<ApiResponse<T>> {
    this.spinnerService.show = showSpinner;

    const request: Request = this.getRequest(path, params);
    return this.http.request(request)
      .do(() => this.spinnerService.hide())
      .map((res: Response) => {
        const response = res.json();
        response.headers = res.headers;
        return response as ApiResponse<T>;
      })
      .catch(err => this.handleError(err));
  }

  public post(path: string, body: any, headers: any, showSpinner: boolean = true): Observable<any> {
    this.spinnerService.show = showSpinner;

    const request: Request = this.postRequest(path, body, headers);
    return this.http
      .request(request)
      .do(() => this.spinnerService.show = false)
      .map((res: Response) => res.json() ? res.json() : res.ok)
      .catch(err => this.handleError(err));
  }

  private getRequest(url: string, params?: any): Request {
    let _headers = new Headers();

    // clear cash in IE11 for live reload
    if (this.detectBrowserService.isIE11()) {
      _headers = new Headers({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      });
    }

    let urlSearchParams = new URLSearchParams();
    if (params) {
      urlSearchParams = this.getUrlSearchParams(params);
    }
    const requestOptions = new RequestOptions({
      method: RequestMethod.Get,
      url,
      params: urlSearchParams,
      headers: _headers
    });
    return new Request(requestOptions);
  }

  private postRequest(url: string, body: any, headers: any): Request {
    const _headers = (url.indexOf('applications') === -1) ?
      new Headers(Object.assign({}, headers, { 'authorization': localStorage.getItem('auth-token') })) :
      new Headers({});
    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      body,
      url,
      headers: _headers,
    });
    return new Request(requestOptions);
  }

  private getUrlSearchParams(params: Object): URLSearchParams {
    const urlSearchParams = new URLSearchParams();
    const paramsKeys = Object.keys(params);
    paramsKeys.forEach((key) => {
      urlSearchParams.set(key, params[key]);
    });
    return urlSearchParams;
  }

  public delete(url, showSpinner: boolean = true, body?) {
    this.spinnerService.show = showSpinner;
    let request;
    if (body) {
      request = this.deleteRequest(url, body);
    } else {
      request = this.deleteRequest(url, body);
    }
    return this.http.request(request)
      .do(() => this.spinnerService.show = false)
      .map((res: Response) => {
        const response = res.json();
        response.headers = res.headers;
        return response;
      })
      .catch(err => this.handleError(err));
  }

  private deleteRequest(url: string, body?): Request {
    let requestOptions;
    if (body) {
      requestOptions = new RequestOptions({
        method: RequestMethod.Delete,
        url,
        body,
        params: new URLSearchParams(),
        headers: new Headers({ 'authorization': localStorage.getItem('auth-token') })
      });
    } else {
      requestOptions = new RequestOptions({
        method: RequestMethod.Delete,
        url,
        params: new URLSearchParams(),
        headers: new Headers({ 'authorization': localStorage.getItem('auth-token') })
      });
    }
    return new Request(requestOptions);
  }

  public update(url: string, body: any, showSpinner: boolean = true) {
    this.spinnerService.show = showSpinner;
    const request = this.updateRequest(url, body);
    return this.http.request(request)
      .do(() => this.spinnerService.show = false)
      .map((res: Response) => {
        const response = res.json();
        response.headers = res.headers;
        return response;
      })
      .catch(err => this.handleError(err));
  }

  private updateRequest(url: string, body: any): Request {
    const requestOptions = new RequestOptions({
      method: RequestMethod.Put,
      url,
      body,
      headers: new Headers({ 'authorization': localStorage.getItem('auth-token') })
    });
    return new Request(requestOptions);
  }
}
