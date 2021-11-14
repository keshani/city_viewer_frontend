import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';
import { isArray } from 'rxjs/internal/util/isArray';
import { Page } from '../common/models/page';

export class CityViewUtil {

    public static getCityGridColumnList(cellTemplates: TemplateRef<any>[]): TableColumn[] {
        let columnList = [
            {
              prop: 'action', name: 'Action', width: 10, minWidth: 50, cellTemplate: cellTemplates[0], cellClass: 'truncate-cell',
              headerTemplate: '', frozenLeft: true, sortable: false, resizeable: false
           },
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

    public  static getNonEmptyFormValues(form: FormGroup): any {
        const formValue = Object.keys(form.getRawValue()).reduce((formKey, key) => {
          const newFormKey:any = formKey;
          if (form.getRawValue()[key]) {
            if (isArray(form.getRawValue()[key])) {
              if (form.getRawValue()[key].length > 0) {
                newFormKey[key] = form.getRawValue()[key];
              }
            } else {
              newFormKey[key] = form.getRawValue()[key];
            }
          }
          return newFormKey;
        }, {});
        return formValue;
      }
    
    public static getPagingRequest(sendData:any, pageInfo:Page): any {
         return {
           pageNumber:pageInfo.pageNumber,
           pageSize: pageInfo.pageSize,
           ...sendData
         }
    }
}