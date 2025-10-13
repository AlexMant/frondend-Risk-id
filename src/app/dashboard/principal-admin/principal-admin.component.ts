import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, Observable } from 'rxjs';
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
  menuList: Observable<IMenu[]>;
  cargasitio: boolean = true;
  cambiopas: string;
  showAlerts: boolean = false;
  mensajeAlerta: string = "";
  ngOnInit(): void {
    

   
    this.getdataMenu();

   
  }

  
  //sustraer primera letra de un string


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 900px)'])
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
    this.cargasitio = false;

    let menuList: IMenu[] = this.getMenuList() as any;
    this.menuList = new Observable((observer) => {
      observer.next(menuList);
      observer.complete();
    });
    console.log("menuList", menuList);
    console.log("this.menuList", this.getMenuList());
    // this.opcionesnavegacionService.getmenuUsuario(JSON.parse(localStorage.getItem("userInfo")).idusuario).subscribe((res: any) => {


    //   this.cargasitio = false;
    //   let menuList: IMenu[] = res.map((element: any) => {
    //     return {
    //       text: element.desopcionnavegacion,
    //       icon: element.icono,
    //       routerLink: element.link,
    //       children: JSON.parse(element.children).map((element2: any) => {
    //         return {
    //           text: element2.desopcionnavegacion,
    //           icon: element2.icono,
    //           routerLink: element2.link,
    //           orden: element2.orden
    //         }
    //       }).sort((a: any, b: any) => a.orden - b.orden)
    //     }

    //   });
    //   // console.log("menuList", menuList);
    //   this.menuList = new Observable((observer) => {
    //     observer.next(menuList);
    //     observer.complete();
    //   });

    // })
  }



  getMenuList(): Observable<IMenu[]> {
  // console.log("getMenuList");




    return new Observable((observer) => {

      const menuList: IMenu[] = [
        {
          text: 'Dashboard',
          icon: 'dashboard',
          routerLink: '/dashboard/admin',
          children: []
        },
        {
          text: 'Configuración',
          icon: 'settings',
          routerLink: '',
          children: [{
            text: "Categoría",
            icon: "category",
            routerLink: "./mantenedores/categoria"
          },
          {
            text: "Residuo",
            icon: "compost",
            routerLink: "./mantenedores/residuos"
          },
          {
            text: "Cupones",
            icon: "request_quote",
            routerLink: "./mantenedores/cupones"
          },
          {
            text: "Empresa",
            icon: "business",
            routerLink: "./mantenedores/empresas"
          },
          {
            text: "Pack",
            icon: "inventory",
            routerLink: "./mantenedores/pack"
          }
            ,
          {
            text: "Tarifario",
            icon: "storefront",
            routerLink: "./mantenedores/tarifario"
          },
          {
            text: "Usuarios",
            icon: "people",
            routerLink: "./mantenedores/usuarios"
          }
          ],
        },
        {
          text: 'Directorio',
          icon: 'menu_book',
          routerLink: '/ddddd',
          children: []
        },
        {
          text: 'Solicitudes',
          icon: 'menu_book',
          routerLink: '/ddddd',
          children: []
        },
        {
          text: 'Tikeckts',
          icon: 'menu_book',
          routerLink: '/ddddd',
          children: []
        },


      ];
      observer.next(menuList);
      observer.complete();
    });


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