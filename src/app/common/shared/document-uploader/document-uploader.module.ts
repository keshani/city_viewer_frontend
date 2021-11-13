import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploaderComponent } from './document-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [DocumentUploaderComponent],
  exports: [
    DocumentUploaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class DocumnetUploaderModule { }
