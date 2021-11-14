import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SnackBarComponent
  ]

})
export class SnackBarModule { }
