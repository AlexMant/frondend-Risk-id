import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html'
})
export class HeaderModalComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

}
