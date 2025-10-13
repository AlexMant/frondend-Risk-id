import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html'
})
export class BlockComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';

  ngOnInit(): void {}

}
