import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvFileImporterComponent } from './csv-file-importer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [CsvFileImporterComponent],
  exports: [
    CsvFileImporterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CsvFileImporterModule { }
