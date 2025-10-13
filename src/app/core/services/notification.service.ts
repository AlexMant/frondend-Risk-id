import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  notify(type: string, message: string){

    this.snackbar.open(message, '', {
      duration: 3000,
      panelClass: ['bg-' + type, 'text-white']
    });
  }

}
