import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService, RequestMethods } from '../../api-call.service';
import { DOCUMENT_UPLOAD_URL } from '../../api-constant';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(
    private apicallservice: ApiCallService
  ) { }

  public uploadDocument(configBody:any): Observable<object> {
    return this.apicallservice.constructApiCall(RequestMethods.POST, DOCUMENT_UPLOAD_URL, configBody)
  }
}
