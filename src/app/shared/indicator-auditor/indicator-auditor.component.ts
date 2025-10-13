import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator-auditor',
  templateUrl: './indicator-auditor.component.html',
  styleUrls: ['./indicator-auditor.component.scss']
})
export class IndicatorAuditorComponent implements OnInit {

  constructor() { }

  @Input() indicators: Array<any> = [];
  @Input() tooltip: string = '';

  ngOnInit(): void { }

}
