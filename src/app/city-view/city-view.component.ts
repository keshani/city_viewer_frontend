import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import { Page } from '../common/models/page';
import { SnackStatus } from '../common/models/snackbar';
import { DocumentUploaderComponent } from '../common/shared/document-uploader/document-uploader.component';
import { SnackBarService } from '../common/shared/snack-bar/snack-bar.service';
import { CityEditComponent } from './city-edit/city-edit.component';
import { CityViewUtil } from './city-view-util';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit, AfterViewInit, OnDestroy {
  // ==================================  DEFINE CHILD COMPORNENT START ====================================
  @ViewChild('viewMenuTmpl')
  public viewMenuTmpl: any;
  // ==================================  DEFINE CHILD COMPORNENT END ====================================
  // ==================================  DEFINE ATTRIBUTES START ============================================
  public dataSource: any[];
  public columns: any;
  public searchCriteria: any;
  public selectedRow: any;
  private destroy$: Subject<any>;
  public templateRefList: TemplateRef<any>[];
  public page = new Page();
  // ==================================  DEFINE ATTRIBUTES END ============================================
  constructor(private cityService: CityService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService) {
    this.dataSource = [];
    this.destroy$ = new Subject();
    this.templateRefList = [];
    this.page.pageNumber = 0;
    this.page.pageSize = 20;
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
  ngAfterViewInit(): void {
    this.createTemplateRefList();
    this.createCityGrid();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // =================================== HTML DIRECT CALL METHODS START =====================================
  public setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.onSearch(this.searchCriteria);
  }

  public onSearch(formData: any) {
    this.searchCriteria = formData;
    const requestPayLoad = CityViewUtil.getPagingRequest(formData, this.page);
    this.cityService.getListOfCities(requestPayLoad).subscribe((data: any) => {
      this.dataSource = data.content;
      this.page.totalRowCount = data.totalElements;
    }, error => {
      this.snackBarService.openSnackBar({
        status: SnackStatus.error.status,
        message: `Internal Server Error`,
        closable: true,
        description: ''
      }, 0, SnackStatus.error.panelClass);
    });
  }

  public goToEditCityInfo(selectedRow: any) {
    this.selectedRow = selectedRow;
    const sendData = {
      selectedRecord: selectedRow
    };
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = sendData;
    dialogConfig.panelClass = 'city-edit-panel'
    dialogConfig.width='60%'

    const dialogRef = this.dialog.open(CityEditComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (!result) {
        return;
      }
      this.onSearch(this.searchCriteria);
    });
  }

  public goToUploadDocumnt(selectedRow: any) {
    const sendData = {
      belongsTo: selectedRow.id,
      docId: selectedRow.cityImages[0].id,
      docType: 'IMAGE',
      screenName: 'City Image Upload',
      description: 'Upload City Image here. Maximum file size will be 50MB'
    };
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'csv-import-panel';
    dialogConfig.disableClose = true;
    dialogConfig.data = sendData;

    const dialogRef = this.dialog.open(DocumentUploaderComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (!result) {
        return;
      }
      this.onSearch(this.searchCriteria);
    });
  }
  // =================================== HTML DIRECT CALL METHODS END =====================================
  // ========================================= OTHER METHODS START =============================================
  private createCityGrid() {
    this.columns = CityViewUtil.getCityGridColumnList(this.templateRefList);
  }

  private createTemplateRefList() {
    this.templateRefList.push(this.viewMenuTmpl);
  }
  // ========================================= OTHER METHODS END =============================================
 
}
