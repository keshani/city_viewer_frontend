import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityViewRoutingModule } from './city-view-routing.module';
import { CityViewComponent } from './city-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CitySearchFilterComponent } from './city-search-filter/city-search-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsvFileImporterModule } from '../common/shared/csv-file-importer/csv-file-importer.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CityViewComponent,
    CitySearchFilterComponent
  ],
  imports: [
    CommonModule,
    CityViewRoutingModule,
    NgxDatatableModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CsvFileImporterModule,
    MatDialogModule
  ],
  exports: [
    CityViewComponent
  ],
  entryComponents: [
    CitySearchFilterComponent
  ]
})
export class CityViewModule { }
