import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UploadModalComponent>) { }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close();
  }

}
