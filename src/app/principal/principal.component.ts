import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  ngOnInit(): void { }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((e: any) => {
        console.log('e', e);
        if (e.url === '/') {

         this.router.navigateByUrl("/auth/login");
        }
      });
  }

  menu: boolean = true;
  menuShow: boolean = true;
}
