import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ApiCallService, RequestMethods } from '../../api-call.service';
import { SnackStatus } from '../../models/snackbar';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documnet-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.scss']
})
export class DocumentUploaderComponent implements OnInit, OnDestroy {
  // ==================================  DEFINE CHILD COMPORNENT START ======================================
  @ViewChild('fileDropRef', { static: false })
  fileDropEl: any;
  // ==================================  DEFINE CHILD COMPORNENT END ========================================
  // ==================================  DEFINE ATTRIBUTES START ============================================
  public fileToUpload: any;
  public title = '';
  public screenName = '';
  public destroy$ = new Subject();
  public belongsTo: any;
  private docType: any;
  public description: any;
  public docId: any;
  // ==================================  DEFINE ATTRIBUTES END ===============================================

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private mdDialogRef: MatDialogRef<DocumentUploaderComponent>,
    private documentService: DocumentService,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.setPassData(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // =================================== HTML DIRECT CALL METHODS START =====================================
  public cancel() {
    this.mdDialogRef.close();
  }

  public onUpload() {
    const uploadingSnackBar = this.snackBarService.openSnackBar({
      status: SnackStatus.uploading.status,
      message: `File is uploading.`,
      closable: true,
      description: 'This may take few minutes.'
    }, 0, SnackStatus.uploading.panelClass);
    const fd = new FormData();
    fd.append('uploadFile', this.fileToUpload);
    fd.append('belongsToId', this.belongsTo);
    fd.append('docType', this.docType);
    fd.append('id', this.docId);
    const configBody = { body: fd };

    this.documentService.uploadDocument(configBody).subscribe(data => {
      this.mdDialogRef.close(true);
      this.snackBarService.closeSnackBar(uploadingSnackBar);
      this.snackBarService.openSnackBar({
        status: SnackStatus.information.status,
        message: `File successfully uploaded`,
        closable: true,
        description: ''
      }, 0, SnackStatus.healthy.panelClass);
    }, error => {
      this.snackBarService.openSnackBar({
        status: SnackStatus.error.status,
        message: `File Upload Failed`,
        closable: true,
        description: ''
      }, 0, SnackStatus.error.panelClass);
    });

  }

  /**
   * handle file from browsing
   */
  public fileBrowseHandler(event: any) {
    this.fileToUpload = event.target.files[0] as File;
    this.fileDropEl.nativeElement.value = '';
  }

  /**
   * on file drop handler
   */
  public onFileDropped(event: any) {
    this.fileToUpload = event[0] as File;
  }

  public removeFile() {
    this.fileToUpload = null;
  }
    // =================================== HTML DIRECT CALL METHODS END =====================================
  // ========================================= OTHER METHODS SATRT ========================================
  private setPassData(data: any) {
    this.belongsTo = data.belongsTo;
    this.docType = data.docType;
    this.screenName = data.screenName;
    this.description = data.description;
    this.docId = data.docId;
  }
  // ========================================= OTHER METHODS END ========================================
}
