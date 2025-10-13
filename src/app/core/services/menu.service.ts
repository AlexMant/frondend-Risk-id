import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menu: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getStateMenu(state: boolean): void{
    this.menu.next(state);
  }


}
