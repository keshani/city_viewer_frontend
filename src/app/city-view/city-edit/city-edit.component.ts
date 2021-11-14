import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackStatus } from 'src/app/common/models/snackbar';
import { SnackBarService } from 'src/app/common/shared/snack-bar/snack-bar.service';
import { CityViewUtil } from '../city-view-util';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  public cityEditform: any;
  public selectedRecord: any;
  public cityImageUrl:any;

  constructor( @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public dialog: MatDialog,
        private mdDialogRef: MatDialogRef<CityEditComponent>,
        private cityService: CityService,
        private snackBarService: SnackBarService
    ) { 

  }

  ngOnInit(): void {
    this.cityEditform = this.createFormGroup();
    this.setPassData(this.dialogData);
  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    groups['id'] = new FormControl();
    groups['cityName'] = new FormControl();
    groups['cityDescription'] = new FormControl();
    groups['country'] = new FormControl();
    groups['latitude'] = new FormControl();
    groups['longitude'] = new FormControl();
    return new FormGroup(groups);
  }

  public onSubmit() {
     const formValues =  CityViewUtil.getNonEmptyFormValues(this.cityEditform);
     this.cityService.updateCityInfo(formValues).subscribe(result => {
      this.snackBarService.openSnackBar({
        status: SnackStatus.healthy.status,
        message: 'Record Update Succesfully',
        closable: true, 
        description: ``
      }, 5000, SnackStatus.error.panelClass);
        this.mdDialogRef.close(formValues);
     })
  }

  public cancel() {
    this.mdDialogRef.close();
  }

  private setPassData(data: any) {
    this.selectedRecord = data.selectedRecord;
    this.cityImageUrl = this.selectedRecord.cityImages[0];
    this.cityEditform.patchValue({
      id: this.selectedRecord.id , cityName: this.selectedRecord.cityName, cityDescription: this.selectedRecord.cityDescription,
      country: this.selectedRecord.country, latitude: this.selectedRecord.latitude, longitude: this.selectedRecord.longitude
    });
  }

}
