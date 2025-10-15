import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { IMenu } from 'src/app/core/interfaces/IMenu';
import { LocalService } from 'src/app/core/services/local-services.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OpcionesnavegacionService } from 'src/app/core/services/opciones-navegacion.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { NotifcacionesappService } from 'src/app/core/services/notifcacionesapp.service';
@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private _vmP: VmParametrosService,
    private activatedRoute: ActivatedRoute,
    private localStore: LocalService,
    private opcionesnavegacionService: OpcionesnavegacionService,
    private alertService: AlertService,
    private notifcacionesappService: NotifcacionesappService,
  ) {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    // if(userInfo){
    //   let admin=+userInfo.check_admin+(+userInfo.check_valorizador)+(+userInfo.check_recolector)



    //   if(admin ==0 ){

    //     this.router.navigate([''], {
    //       relativeTo: this.activatedRoute,
    //     });
    //   }

    // }
  }
  get vmP() {
    return this._vmP;
  }
  nombreUsuario: any = JSON.parse(localStorage.getItem("userInfo"))?.usuarioConectado;
  tipoUsuario: any = JSON.parse(localStorage.getItem("userInfo"))?.check_tipo;
  menuList: IMenu[] = [];
  cargasitio: boolean = true;
  cambiopas: string;
  showAlerts: boolean = false;
  mensajeAlerta: string = "";
  ngOnInit(): void {
    
    
 console.log("ngOnInit PrincipalAdminComponent",JSON.parse(localStorage.getItem("userInfo")));
   
    this.menuList = this.getMenuList();
    this.cargasitio = false;
   
  }

    extraeNombre(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(userInfo){
      return userInfo.usuarioConectado;
    }else{
      return ""
    } 
  }
  //sustraer primera letra de un string

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 700px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(

        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  getdataMenu() {
    // Eliminada función, el menú se carga directamente en ngOnInit
  }



  getMenuList(): IMenu[] {
  // console.log("getMenuList");




    return [
      {
        text: 'Dashboard',
        icon: 'dashboard',
        routerLink: '/dashboard/dashboard-admin',
        children: []
      },
      {
        text: 'IPER',
        icon: 'settings',
        routerLink: '',
        children: [{
          text: "Explorar Procesos",
          icon: "category",
          routerLink: "./mantenedores/categoria"
        },
        {
          text: "Descargar IPER",
          icon: "compost",
          routerLink: "./mantenedores/residuos"
        },
        {
          text: "Tabla VEP",
          icon: "request_quote",
          routerLink: "./mantenedores/cupones"
        },
         
        ],
      },
      {
        text: 'Accidentes',
        icon: 'menu_book',
        routerLink: '/ddddd',
        children: []
      },
      {
        text: 'Informes',
        icon: 'menu_book',
        routerLink: '/ddddd',
        children: []
      },
      {
        text: 'Estadisticas',
        icon: 'menu_book',
        routerLink: '/ddddd',
        children: []
      },
    ];


  }

  volverInicio() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    this.localStore.clearData();
    // this.router.navigate(["./auth/login"]);
    this.router.navigate([""]);
  }


 


}