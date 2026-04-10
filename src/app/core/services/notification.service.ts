import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar
    , private _snackBar: MatSnackBar
  ) { }

  notify(type: string, message: string) {

    // this.snackbar.open(message, '', {
    //   duration: 3000,
    //   panelClass: ['bg-' + type, 'text-white']
    // });
    this.openSnackBar(type, message);
  }



  durationInSeconds = 5;
  openSnackBar(type: string, message: string) {

    if (type === 'success') {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: message
          , action: 'done'
          , snackBar: this._snackBar
        },
        panelClass: ['success-snackbar'],
        duration: 3000,


      });
    }

     if (type === 'danger') {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: message
          , action: 'error_outline'
          , snackBar: this._snackBar
        },
        panelClass: ['error-snackbar'],
        duration: 3000,


      });
    }
 if (type === 'warning') {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: message
          , action: 'warning_amber'
          , snackBar: this._snackBar
        },
        panelClass: ['warning-snackbar'],
        duration: 3000,


      });
    }


     if (type === 'info') {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: message
          , action: 'info'
          , snackBar: this._snackBar
        },
        panelClass: ['info-snackbar'],
        duration: 3000,


      });
    }



  }
}



