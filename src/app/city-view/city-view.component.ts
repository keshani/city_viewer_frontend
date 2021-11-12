import { Component, OnInit } from '@angular/core';
import { ApiCallService, RequestMethods } from '../common/api-call.service';
import { CityViewUtil } from './city-view-util';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {

  public dataSource:any;
  public columns:any;
  public searchCriteria:any;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.createCityGrid();
 //   this.populateCityList();

  }

  public onSearch(formData:any) {
       this.searchCriteria = formData;
       const requestPayLoad = {
         pageSize: 100,
         pageNumber: 1,
         ...formData
       }
       this.cityService.getListOfCities(requestPayLoad).subscribe((cityList) => {
        this.dataSource = cityList;
   });
  }

  private createCityGrid() {
    this.columns = CityViewUtil.getCityGridColumnList();  
  }


}
