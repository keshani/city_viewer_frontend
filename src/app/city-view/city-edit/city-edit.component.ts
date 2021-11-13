import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityViewUtil } from '../city-view-util';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  public cityEditform: any;

  constructor( @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public dialog: MatDialog,
        private mdDialogRef: MatDialogRef<CityEditComponent>,
        private cityService: CityService
    ) { 

  }

  ngOnInit(): void {
    this.cityEditform = this.createFormGroup();
  }

  private createFormGroup() : FormGroup {
    const groups: any = {};
    groups['id'] = new FormControl(1);
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
        this.mdDialogRef.close(formValues);
     })
  }

  public cancel() {
    this.mdDialogRef.close();
  }

}
