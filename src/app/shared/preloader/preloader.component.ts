import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html'
})
export class PreloaderComponent implements OnInit {

  constructor() { }
  @Input() size: string = 'small' // small | medium | large
  @Input() message: string = 'Por favor espere...';
  @Input() full: boolean = false;

  ngOnInit(): void {}

}
