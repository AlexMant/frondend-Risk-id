import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  constructor(
    public platform: Platform,
    public location: Location,
    private dialog: MatDialog) { }



  @Input() theme: string = 'light';
  @Input() border: boolean = true;
  @Input('margin-bottom') marginBottom: boolean = true;
  @Input() back: boolean = false;

  @Input('back-modal') backModal: boolean = false;

  @Input('arrow-back') arrowBack: boolean = false;
  @Input('arrow-back-path') arrowBackPath: string = '';

  @Input() title: string = '';
  @Input() icons: Array<{ icon: string; tooltip: string; event: string }> = [];
  @Input('btn-text') btnText: string = '';
  @Input('btn-icon') btnIcon: string = '';

  @Input() sticky: boolean = false;

  @Output() actionPrimary: EventEmitter<void> = new EventEmitter();
  @Output() actionIcon: EventEmitter<string> = new EventEmitter();
  @Output() actionBack: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { }

}
