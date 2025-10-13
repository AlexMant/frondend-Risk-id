import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-double-scroll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper1" #wrapper1>
      <div class="div1" #div1></div>
    </div>
    <div class="wrapper2" #wrapper2>
        <div class="div2" #div2>
            <ng-content></ng-content>
        </div>
    </div>
  `,
  styles: [
    `
      .wrapper1, .wrapper2 { width: 100%; overflow-x: auto; overflow-y: hidden; }
    `,
    `
      .div1 { overflow: hidden; height: 0.5px;}
    `,
    `
      .div2 { overflow: hidden; min-width: min-content}
    `
  ]
})
export class DoubleScrollComponent implements AfterViewInit {

  @ViewChild('wrapper1') wrapper1: ElementRef<any>;
  @ViewChild('wrapper2') wrapper2: ElementRef<any>;

  @ViewChild('div1') div1: ElementRef<any>;
  @ViewChild('div2') div2: ElementRef<any>;

  constructor(private _r: Renderer2, private _cd: ChangeDetectorRef) {
  }


  ngAfterViewInit() {

    this._cd.detach();

    this._r.setStyle(this.div1.nativeElement, 'width', this.div2.nativeElement.clientWidth + 'px');

    this.wrapper1.nativeElement.onscroll = e => this.wrapper2.nativeElement.scroll((e.target as HTMLElement).scrollLeft, 0)
    this.wrapper2.nativeElement.onscroll = e => this.wrapper1.nativeElement.scroll((e.target as HTMLElement).scrollLeft, 0)

  }

}
