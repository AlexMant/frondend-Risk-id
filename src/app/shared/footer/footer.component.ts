import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor() { }

  @Input() mode: string = 'row'; // row | col
  @Input() border: boolean = true;

  ngOnInit(): void {


  }

}
