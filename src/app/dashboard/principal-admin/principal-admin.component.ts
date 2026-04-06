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
import { opcionesMenu } from 'src/app/core/interfaces/solicitudcotizacion.model';
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
  nombreempresa: any = JSON.parse(localStorage.getItem("userInfo"))?.nombreempresa;

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
    this.cargasitio = false;  //quitar despues
    this.menuList = this.getMenuList();
    return; //quitar despues
    this.opcionesnavegacionService.getmenuUsuario(JSON.parse(localStorage.getItem("userInfo")).idusuario).subscribe((res: any) => {


      this.cargasitio = false;
      let menuList: IMenu[] = res.map((element: any) => {
        return {
          text: element.desopcionnavegacion,
          icon: element.icono,
          routerLink: element.link,
          children: JSON.parse(element.children).map((element2: any) => {
            return {
              text: element2.desopcionnavegacion,
              icon: element2.icono,
              routerLink: element2.link,
              orden: element2.orden
            }
          }).sort((a: any, b: any) => a.orden - b.orden)
        }

      });
      // console.log("menuList", menuList);
      this.menuList = new Observable((observer) => {
        observer.next(menuList);
        observer.complete();
      });

    })
  }


  verificarComponenteMenu(componenteMenu: opcionesMenu[], nombreComponente: string): boolean {
    for (let i = 0; i < componenteMenu.length; i++) {
      if (componenteMenu[i].nombreComponente === nombreComponente) {
        return true;
      }
    }
    return false;
  }

  getMenuList(): Observable<IMenu[]> {
    return new Observable((observer) => {
      // Permisos del usuario: solo componentes con acción "ver"

      // console.log("componenteMenu en getMenuList antes de filtrar", JSON.parse(localStorage.getItem("userInfo"))?.componenteMenu)

      const permisos = JSON.parse(localStorage.getItem("userInfo"))?.componenteMenu
        .filter((x: any) => x.accion === 'ver')
        .map((x: any) => x.codigo);

      // console.log("permisos", permisos)
      // console.log("componenteMenu en getMenuList", this._vmP.componenteMenu)

      // Menú original
      const menuList: IMenu[] = [
        { text: 'Dashboard', icon: 'bi bi-clipboard2-data', routerLink: '/dashboard/dashboard-admin', children: [], codigo: 'DASHBOARD' },
        {
          text: 'IPER', icon: 'bi bi-gear', routerLink: "/dashboard/incidentes/", children: [
            { text: "Descargar IPER", icon: "bi bi-arrow-down-square", routerLink: "/dashboard/incidentes/descargar-iper", codigo: 'IPER_DESCARGAR' },
            { text: "Tabla Vep", icon: "bi bi-table", routerLink: "./tabla-vep", codigo: 'IPER_TABLAVEP' }
          ],codigo: 'IPER'
        },
        {
          text: 'KPI de gestión', icon: 'bi bi-journal-text', routerLink: '', children: [
            { text: "Indicadores SST", icon: "bi bi-file-earmark-pdf", routerLink: "./informes/indicador-sst", codigo: 'KPI_INDICADORES_SST' },
            { text: "Precursores", icon: "bi bi-file-earmark-pdf", routerLink: "./informes/precursores", codigo: 'KPI_PRECURSORES' },
            { text: "Simulador DS67", icon: "bi bi-file-earmark-bar-graph-fill", routerLink: "./informes/simulador-ds67", codigo: 'KPI_SIM_DS67' },
            { text: "Mapa de riesgos", icon: "bi bi-file-earmark-bar-graph-fill", routerLink: "./informes/mapa-riesgo", codigo: 'KPI_MAPA_RIESGOS' }
          ],codigo: 'KPI'
        },
        { text: 'Ocurrencias anormales', icon: 'bi bi-exclamation-octagon', routerLink: '/dashboard/ocurrencias', children: [] ,codigo: 'OCURRENCIAS' },
        {
          text: 'Administracion', icon: 'bi bi-house-gear', routerLink: '', children: [
            { text: "Holding", icon: "bi bi-building", routerLink: "./gestion/holding", codigo: 'ADMIN_HOLDING' },
            { text: "Empresa", icon: "bi bi-building", routerLink: "./gestion/empresa", codigo: 'ADMIN_EMPRESA' },
            { text: "Centros de Trabajo", icon: "bi bi-building", routerLink: "./gestion/centros-de-trabajo", codigo: 'ADMIN_CENTROS_TRABAJO' },
            { text: "Mapa de procesos", icon: "bi bi-card-list", routerLink: "./gestion/procesos", codigo: 'ADMIN_MAPA_PROCESOS' },
            { text: "Daños Probables", icon: "bi bi-bandaid", routerLink: "./gestion/danos-probable", codigo: 'ADMIN_DANOS_PROBABLE' },
            { text: "Peligros", icon: "bi bi-safe2-fill", routerLink: "./gestion/peligros", codigo: 'ADMIN_PELIGROS' },
            { text: "Usuarios", icon: "bi bi-people", routerLink: "./gestion/usuarios", codigo: 'ADMIN_USUARIOS' },
            { text: "Trabajadores", icon: "bi bi-people", routerLink: "./gestion/trabajadores", codigo: 'ADMIN_TRABAJADORES' }
          ],codigo: 'ADMIN'
        }
      ];

      // Filtrar menú principal y submenús según permisos
      const menuListFiltrado: IMenu[] = menuList
        .filter(menu => permisos.includes(menu.codigo)) // Filtrar menú principal
        .map(menu => ({
          ...menu,
          children: menu.children
            ? menu.children.filter(child => permisos.includes(child.codigo))
            : []
        }));

      observer.next(menuListFiltrado);
      observer.complete();
      // observer.next(menuList);
      // observer.complete();
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