import { TemplateRef } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

export class CityViewUtil {

    public static getCityGridColumnList(): TableColumn[] {
        let columnList = [
            {
                prop: 'cityName', name: 'City Name', width: 150, minWidth: 70, cellTemplate: '', cellClass: 'truncate-cell',
                headerTemplate: '', frozenLeft: false, resizeable: true
            },
            {
                prop: 'country', name: 'Country', width: 150, minWidth: 70, cellTemplate: '', cellClass: 'truncate-cell',
                headerTemplate: '', frozenLeft: false, resizeable: true
            },
            {
                prop: 'cityDescription', name: 'Description', width: 150, minWidth: 70, cellTemplate: '', cellClass: 'truncate-cell',
                headerTemplate: '', frozenLeft: false, resizeable: true
            },
            {
                prop: 'latitude', name: 'Latitude', width: 80, minWidth: 70, cellTemplate: '', cellClass: 'truncate-cell, text-center',
                headerTemplate: '', frozenLeft: false, resizeable: false
            },
            {
                prop: 'longitude', name: 'Longitude', width: 100, minWidth: 70, cellTemplate: '', cellClass: 'truncate-cell, text-center',
                headerTemplate: '', frozenLeft: false,  resizeable: false
            },
            
        ];
        return columnList;
    }

}