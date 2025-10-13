import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit, OnDestroy {

  constructor(private nav: MenuService,
    ) { }

  @Output() menu: EventEmitter<boolean> = new EventEmitter();
  menuShow: boolean = true;

  componentDestroyed$: Subject<boolean> = new Subject()
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
 
  ngOnInit(): void {
    const usertype = JSON.parse(localStorage.getItem('usertype'));
  }

 
}
