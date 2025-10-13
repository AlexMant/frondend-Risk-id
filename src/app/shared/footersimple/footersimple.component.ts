import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-footersimple',
  templateUrl: './footersimple.component.html'
})
export class FootersimpleComponent implements OnInit {

  constructor() { }

  @Input() mode: string = 'row'; // row | col
  @Input() border: boolean = true;

  ngOnInit(): void {


  }

}
