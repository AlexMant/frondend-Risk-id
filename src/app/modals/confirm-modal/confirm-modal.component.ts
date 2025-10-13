import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmModalComponent>) { }
  type: string = '' // warning | danger
  title: string = '';
  titleventana: string = '';
  message: string = '';
  btnText: string = 'Enviar';
  btnTextSecondary: string = '';

  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title;
      this.titleventana = this.data.titleventana;
      this.message = this.data.message;
      this.type = this.data.type;
      this.btnText = this.data.btnText;
      this.btnTextSecondary = this.data.btnTextSecondary;
    }
  }

  close() {
    this.dialogRef.close();
  }

  closeAction() {
    this.dialogRef.close(true);
  }

}
