import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mantenedor-add',
  templateUrl: './mantenedor-add.component.html'
})
export class MantenedorAddComponent implements OnInit {

  constructor() { }
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

}
