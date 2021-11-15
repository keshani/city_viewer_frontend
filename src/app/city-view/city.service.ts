import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import {  CITY_VIEW_EDIT_URL, CITY_VIEW_FETCH_URL } from '../common/api-constant';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private apicallservice: ApiCallService
  ) { }

  public getListOfCities(searchCriteria:any): Observable<object> {
    return this.apicallservice.constructApiCall(RequestMethods.GET, CITY_VIEW_FETCH_URL,searchCriteria);
  }
  public updateCityInfo(cityInfo:any): Observable<object>  {
     return this.apicallservice.constructApiCall(RequestMethods.PUT, CITY_VIEW_EDIT_URL,cityInfo);
  }
}
