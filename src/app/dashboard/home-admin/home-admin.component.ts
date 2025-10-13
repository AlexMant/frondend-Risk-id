import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  varable:any = 'bi bi-24 bi-house';
  constructor() { }

  ngOnInit(): void {
  }

}
