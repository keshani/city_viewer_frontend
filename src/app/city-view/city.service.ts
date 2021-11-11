import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { isArray } from 'rxjs/internal-compatibility';
import { SERVICE_URL } from '../app-config';
import { ApiCallService, RequestMethods } from '../common/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private apicallservice: ApiCallService
  ) { }

  public getListOfCities(): Observable<object> {
    return this.apicallservice.constructApiCall(RequestMethods.GET, "/fetchListOfCities", {});
  }
}
