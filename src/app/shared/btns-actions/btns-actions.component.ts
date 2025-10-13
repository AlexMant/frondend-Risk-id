import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btns-actions',
  templateUrl: './btns-actions.component.html',
})
export class BtnsActionsComponent implements OnInit {
  constructor() {}

  @Input() theme: string = 'light';
  @Input() fixed: boolean = false;
  @Input('text-primary') textPrimary: string = '';
  @Input('text-secondary') textSecondary: string = '';

  @Input('disabled-p') disabledP: boolean = false;

  @Input() icon: string = '';
  @Output() actionPrimary: EventEmitter<any> = new EventEmitter();
  @Output() actionSecondary: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
}
