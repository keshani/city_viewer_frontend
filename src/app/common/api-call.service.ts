import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import {isArray} from 'rxjs/internal-compatibility';
import { SERVICE_URL } from '../app-config';

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
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
      let fullUrl = SERVICE_URL+url;
      switch (method) {
        case 'GET':
          return this.createGetRequest(fullUrl,configObject);
        case 'PUT':
            return this.createPutRequest(fullUrl,configObject);
        default:
          return this.http.request(method, fullUrl, configObject).pipe(catchError(error => throwError(error)));
      }
  }

  private createGetRequest( url:string, configObject:any)  : Observable<Object>  {
   return this.http.get(url, {params:configObject}); 
  }
  private createPutRequest( url:string, configObject:any)  : Observable<Object>  {
    return this.http.put(url, configObject); 
   }

}
