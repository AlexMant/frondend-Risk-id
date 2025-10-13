import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  constructor() { }

  @Input() indicators: Array<any> = [];
  @Input() tooltip: string = '';

  ngOnInit(): void { }

}
