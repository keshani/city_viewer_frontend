import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackBarData } from '../../models/snackbar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(snackBarData: SnackBarData, timeDuration: number, className: string): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: className,
      data: snackBarData
    });
  }
  closeSnackBar(ref: MatSnackBarRef<any>) {
    ref.dismiss();
  }
}
