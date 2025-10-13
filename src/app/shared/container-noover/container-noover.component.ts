import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-noover',
  templateUrl: './container-noover.component.html'
})
export class ContainerNooverComponent implements OnInit {

  constructor() { }

  @Input() border: boolean = true;
  @Input() bg: boolean = true;
  @Input() row: boolean = false;

  ngOnInit(): void { }

}
