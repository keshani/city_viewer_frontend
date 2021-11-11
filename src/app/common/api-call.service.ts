import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import {isArray} from 'rxjs/internal-compatibility';
import { SERVICE_URL } from '../app-config';

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  )
  
  {
    this.headers = new HttpHeaders({
      'x-username': 'tesoro',
    });
  }

  constructApiCall(method: RequestMethods, url:string, configObject:any ) : Observable<Object> {
     const fullUrl = SERVICE_URL+url;
     return this.http.request(method, fullUrl, configObject).pipe(catchError(error => throwError(error)));
  }
}
