import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../core/services/local-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStore: LocalService,
    public platform: Platform) {
     
      console.log("home",this.localStore.getData('userInfo'));
       
      if(this.localStore.getData('userInfo') == '' && this.localStore.getData('userInfo') == null || this.localStore.getData('userInfo') == undefined){

        this.router.navigateByUrl("/auth/login");
      } else{

        
          this.router.navigateByUrl("/dashboard");
       
      }


  }
}