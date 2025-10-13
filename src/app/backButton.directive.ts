import { Directive, HostListener, Input } from '@angular/core';
import { NavegarService } from './navegar.service';

@Directive({
  selector: '[backButton]'
})
export class BackButtonDirective {
  @Input() backButton: any;
  constructor(private navigation: NavegarService) { }

  @HostListener('click')
  onClick(): void {
    console.log('onClick')
    this.navigation.back(this.backButton)
  }
}
