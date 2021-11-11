import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ApiCallService, RequestMethods } from '../../api-call.service';

@Component({
  selector: 'app-csv-file-importer',
  templateUrl: './csv-file-importer.component.html',
  styleUrls: ['./csv-file-importer.component.scss']
})
export class CsvFileImporterComponent implements OnInit, OnDestroy {
  // ==================================  DEFINE CHILD COMPORNENT START ======================================
  @ViewChild('fileDropRef', { static: false })
  fileDropEl: any;
  // ==================================  DEFINE CHILD COMPORNENT END ========================================
  // ==================================  DEFINE ATTRIBUTES START ============================================
  private requestPayload: any = {};
  public fileToUpload: any;
  public title = '';
  public supportedFileFormats = '';
  public requiredFieldNames = '';
  public screenName = '';
  public destroy$ = new Subject();
  public requestName = '';
  // ==================================  DEFINE ATTRIBUTES END ===============================================

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private mdDialogRef: MatDialogRef<CsvFileImporterComponent>,
              private apiCallService: ApiCallService
  ) {
  }

  ngOnInit(): void {
    this.setPassData(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ==================================  DEFINE ATTRIBUTES START ============================================
  public cancel() {
    this.mdDialogRef.close();
  }

  public onUpload() {
    const fd = new FormData();
    let obj = {name:"test"};
    fd.append('name', "test");
    fd.append('uploadFile', this.fileToUpload);
   // const configBody  = {body:{document:{name:"test"},  fd}};
     const configBody  = {body:fd};
    this.apiCallService.constructApiCall(RequestMethods.POST,"/uploadDocument",configBody).subscribe(data => {
      alert(data);
    });

  }

 

  /**
   * handle file from browsing
   */
  public fileBrowseHandler(event:any) {
    this.fileToUpload = event.target.files[0] as File;
    this.fileDropEl.nativeElement.value = '';
  }

  /**
   * on file drop handler
   */
  public onFileDropped(event:any) {
    this.fileToUpload = event[0] as File;
  }

  public removeFile() {
    this.fileToUpload = null;
  }

  // ==================================  DEFINE ATTRIBUTES END ============================================
  // ========================================= OTHER METHODS SATRT ========================================
  private handleResponseSuccess() {
    // this.uploadStore.pipe(select(fromUploadDocuments.getImportCsvStatus)).pipe(takeUntil(this.destroy$))
    //   .subscribe((result) => {
    //     const body = result['body'];
    //     const self = this;
    //     if (body && body.type === 'application/json') {
    //       const reader = new FileReader();
    //       reader.onloadend = function(e) {
    //         const responseText = e.target.result;
    //         if (responseText === 'SUCCESS') {
    //           this.customSnackBarService.openSnackBar({
    //             status: SnackStatus.information.status,
    //             message: `File data successfully uploaded`,
    //             closable: true,
    //             description: ''
    //           }, 0, SnackStatus.healthy.panelClass);
    //         }
    //       }.bind(self);
    //       reader.readAsText(body);
    //     } else if (body.type === 'application/octet-stream') {
    //       const fileName = 'CSVError_' + new Date().getTime() + '.csv';
    //     }
    //   });
  }

  private setPassData(data: any) {
    this.title = data.title;
    this.supportedFileFormats = data.supportedFileFormats;
    this.requiredFieldNames = data.requiredFieldNames;
    this.screenName = data.screenName;
    this.requestName = data.requestName;
  }
  // ========================================= OTHER METHODS END ========================================
}
