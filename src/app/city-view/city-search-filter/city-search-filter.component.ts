import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  
}
