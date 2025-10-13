import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html'
})
export class ColComponent implements OnInit {

  constructor() { }

  @Input() border: boolean = false;
  @Input() bg: boolean = false;

  ngOnInit(): void {}

}
