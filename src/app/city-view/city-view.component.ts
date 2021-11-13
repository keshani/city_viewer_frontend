import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import { DocumentUploaderComponent } from '../common/shared/document-uploader/document-uploader.component';
import { CityEditComponent } from './city-edit/city-edit.component';
import { CityViewUtil } from './city-view-util';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit, AfterViewInit {


  @ViewChild('viewMenuTmpl')
  public viewMenuTmpl: any;

  public dataSource:any[];
  public columns:any;
  public searchCriteria:any;
  public selectedRow:any;
  private destroy$:Subject<any>;
  public templateRefList: TemplateRef<any>[];

  constructor(private cityService: CityService,
              private dialog: MatDialog) {
    this.dataSource = [];
this.destroy$ = new Subject();
 this.templateRefList = [];
   }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.createTemplateRefList();
    this.createCityGrid();
  }

  public onSearch(formData:any) {
       this.searchCriteria = formData;
       const requestPayLoad = {
         pageSize: 100,
         pageNumber: 0,
         ...formData
       }
       this.cityService.getListOfCities(requestPayLoad).subscribe((data:any) => {
        this.dataSource = data.content;
   });
  }

  private createCityGrid() {
    this.columns = CityViewUtil.getCityGridColumnList(this.templateRefList);  
  }

  private createTemplateRefList() {
    this.templateRefList.push(this.viewMenuTmpl);
  }

  public goToEditCityInfo(selectedRow: any) {
    this.selectedRow = selectedRow;
    const sendData = {
    };
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = sendData;

    const dialogRef = this.dialog.open(CityEditComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if(!result) {
        return;
      }
      this.onSearch(this.searchCriteria);
    });

  }

  public goToUploadDocumnt() {
    const sendData = {
    };
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'csv-import-panel';
    dialogConfig.disableClose = true;
    dialogConfig.data = sendData;

    const dialogRef = this.dialog.open(DocumentUploaderComponent, dialogConfig);
  }



}
