import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';
  @Input() data: any = '';
  @Input('array-data') arrayData: Array<{title: string; data: any;}> = []; 

  ngOnInit(): void {}

}
