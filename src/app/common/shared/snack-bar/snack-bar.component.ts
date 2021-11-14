
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackBarData } from '../../models/snackbar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) { }

  ngOnInit(): void {
  }

  close() {
    this.snackBarRef.dismiss();
  }

}
