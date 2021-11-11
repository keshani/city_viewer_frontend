import {ApiCallService} from '@app/core/services/api-call.service';
import { Injectable } from '@angular/core';
import { ApiQueryBuilder } from '@app/core/services/api-query-builder';
import { CustomFavouriteFilter } from '@app/shared/models/dashboard/custom-favourite-filter';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {


  constructor(private apiService: ApiCallService) {
  }
  uploadCsvFile(requestName: any, payload: any): Observable<object> {
    return this.apiService.constructApiCall(
        new ApiQueryBuilder()
        .addName(requestName)
        .addBody(payload)
        .addEntry('responseType', 'blob')
        .addEntry('observe', 'response')
        .setIsFile(true)
        .build()
    );
  }

  saveFieldNames(data): Observable<object> {
    return this.apiService.constructApiCall(
      new ApiQueryBuilder()
        .addName('fleetManagementFieldSave')
        .addBody(data)
        .build()
    );
  }
 handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      if (result instanceof CustomFavouriteFilter) {
        result.isFavorite = false;
      }
      console.error(error);
      console.log (`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
