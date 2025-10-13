import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NoticeInterface } from 'src/app/core/interfaces/notice.model';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {

  @ViewChild('btnClose') btnClose: MatButton;
  @Input() type: string = ''; // success | danger | warning | info
  @Input() message: string = '';
  @Input() showclose: boolean = true;
  snackbar: boolean = false;

  constructor(
    @Optional() @Inject(MAT_SNACK_BAR_DATA) private data: NoticeInterface,
    @Optional() private notification: MatSnackBarRef<NoticeComponent>) { }

  ngOnInit(): void {
    if (this.data) {
      this.type = this.data.type;
      this.message = this.data.message;
      this.snackbar = true;
    }
  }

  close(e: Event) {
    if (this.snackbar) {
      this.notification.dismiss();
    } else {
      const notification: HTMLElement = this.btnClose._elementRef.nativeElement.parentElement.parentElement;
      notification.remove();
    }
  }

}
