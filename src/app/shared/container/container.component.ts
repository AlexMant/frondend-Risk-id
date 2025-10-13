import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent implements OnInit {

  constructor() { }

  @Input() border: boolean = true;
  @Input() bg: boolean = true;
  @Input() row: boolean = false;

  ngOnInit(): void {}

}
