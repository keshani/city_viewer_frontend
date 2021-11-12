import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OuterSubscriber } from 'rxjs/internal-compatibility';
import { CsvFileImporterComponent } from 'src/app/common/shared/csv-file-importer/csv-file-importer.component';
import { CityViewUtil } from '../city-view-util';

@Component({
  selector: 'app-city-search-filter',
  templateUrl: './city-search-filter.component.html',
  styleUrls: ['./city-search-filter.component.scss']
})
export class CitySearchFilterComponent implements OnInit {
  
  @Output() searchSubmit = new EventEmitter<any>();
  public citySearchform: any;

  constructor(
    public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    this.citySearchform = this.createFormGroup();
  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    groups['cityName'] = new FormControl();
    return new FormGroup(groups);
  }

  public onSubmit() {
      const formValues =  CityViewUtil.getNonEmptyFormValues(this.citySearchform);
      this.searchSubmit.emit(formValues);
  }

  goToCSVImport() {
    const sendData = {
      title: 'Import Equipment via CSV',
      supportedFileFormats: 'Supported File Format: CSV',
      requiredFieldNames: 'Required Columns(in order from left to right): Organization Name, Equipment ID, Fleet Code,<br>' +
        'Sub Fleet Code, Fleet Customer Name, Fleet Commodity, Fleet Comment, Fleet Comment 2, <br>' +
        'Testing Status',
      screenName: 'FLEET',
      requestName: 'fleetManagementCSVImport'
    };
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'csv-import-panel';
    dialogConfig.disableClose = true;
    dialogConfig.data = sendData;

    const dialogRef = this.dialog.open(CsvFileImporterComponent, dialogConfig);
  }
}
