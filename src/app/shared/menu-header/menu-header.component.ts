import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeComponent } from 'src/app/auth/change/change.component';
import { listNotificaciones } from 'src/app/core/interfaces/IMenu';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalService } from 'src/app/core/services/local-services.service';
import { NotifcacionesappService } from 'src/app/core/services/notifcacionesapp.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OpcionesnavegacionService } from 'src/app/core/services/opciones-navegacion.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { Fx } from 'src/app/utils/functions';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  constructor(private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private _vmP: VmParametrosService,
    private activatedRoute: ActivatedRoute,
    private localStore: LocalService,
    private opcionesnavegacionService: OpcionesnavegacionService,
    private alertService: AlertService,
    private notifcacionesappService: NotifcacionesappService,) { }


  get vmP() {
    return this._vmP;
  }

  // tipoUsuario: any = JSON.parse(localStorage.getItem("userInfo"))?.check_tipo;


  cargasitio: boolean = true;
  cambiopas: string;
  showAlerts: boolean = false;
  mensajeAlerta: string = "";


  ngOnInit(): void {

    console.log("tipoUsuario", JSON.parse(localStorage.getItem("userInfo")));

    if (JSON.parse(localStorage.getItem("userInfo"))) {
      if (JSON.parse(localStorage.getItem("userInfo")).cambiapass) {
        this.openModalCambioPass();
      }
    }
    // if (JSON.parse(localStorage.getItem("userInfo"))?.check_tipo == 3) {

    //   this.chagenotificaciones();

    //   this.alertService.alert$.subscribe((alert: any) => {
    //     this.showAlerts = true;
    //     this.mensajeAlerta = alert.message;

    //     setTimeout(() => {
    //       this.showAlerts = false;
    //       this.mensajeAlerta = "alert.message";
    //     }, alert.time);
    //   });

    //   // this.muestranotificacion();
    //   this.cantidadcnt();

    //   if (JSON.parse(localStorage.getItem("userInfo"))) {
    //     this.cambiopas = JSON.parse(localStorage.getItem("userInfo")).passwordStatus;
    //     if (this.cambiopas == "1") {
    //       this.openModalCambioPass();
    //     }
    //   } else {
    //     this.cambiopas = "";
    //   }

    // }

  }

  extraeNombre() {


    if (JSON.parse(localStorage.getItem("userInfo"))) {
      return JSON.parse(localStorage.getItem("userInfo")).usuarioConectado;
    } else {
      return ""
    }
  }
  extraePerfil() {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      return JSON.parse(localStorage.getItem("userInfo")).permiso[0].nombre_permiso;
    } else {
      return ""
    }
  }





  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    this.localStore.clearData();
    // this.router.navigate(["./auth/login"]);
    this.router.navigate([""]);
  }


  openModalCambioPass() {

    // console.log("openmodalEdit", value);

    const isSmallScreen = window.innerWidth < 600;
    this.dialog.open(ChangeComponent, {
      autoFocus: false,
      width: isSmallScreen ? '90vw' : '30vw',
      minWidth: isSmallScreen ? '300px' : '350px',
      maxWidth: '90vw',
      disableClose: false,
      // height: '70vh',
      panelClass: 'custom-dialog-container',
      data: {},
    }).afterClosed().subscribe((res) => {
      //  console.log("openmodalAdd_res", res);

      if (res == true) {
        // console.log("openmodalAdd_res", res);
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
        this.localStore.clearData();
        this.snackbar.notify('success', 'contraseña cambiada exitosamente');
        this.logOut();
      }
    });
  }

  //Revisar si se pueden mostrar por nombre
  cantidadNotificaciones: number = 0;
  muestranotificacion() {

    if (JSON.parse(localStorage.getItem("userInfo"))?.check_tipo == 3) {
      this.notifcacionesappService.notificacionespush().subscribe(
        (data) => {
          if (data.length > 0) {
            let cantidad = 'Usted tiene ' + data.length + ' notificaciones nuevas';
            this.alertService.showAlert(cantidad, 6000);
          }
        },
        (err) => {
          console.log("error", err);
        }
      );
    }
    //  let  fechaActual2 = new Date().toLocaleTimeString();
    //  this.alertService.showAlert(fechaActual2, 6000);
    // console.log("muestranotificacion",fechaActual2);
  }




  carganotificaciones: boolean = false;
  cantidadList: number = 0;
  notifcacionesList: Observable<listNotificaciones[]>;
  listaNotificaciones() {
    this.carganotificaciones = false;
    this.cantidadNotificaciones = 0;
    this.notifcacionesappService.notificacioneslist().subscribe(
      (res) => {
        this.cantidadList = res.length ?? 0;


        let notifcacionesList: listNotificaciones[] = res.map((element: any) => {
          return {
            text: element.mensaje,
            fecha: Fx.format("serviceDateTime", element.dfecha),
            titulo: element.titulo,
            tipo: element.tipoNotificacion,
          }

        });

        this.notifcacionesList = new Observable((observer) => {
          observer.next(notifcacionesList);
          observer.complete();
        });
        this.carganotificaciones = true;


      },
      (err) => {

        this.carganotificaciones = false;
      }
    );



  }



  cantidadcnt() {

    if (JSON.parse(localStorage.getItem("userInfo"))?.check_tipo == 3) {

      this.notifcacionesappService.getnotificacnt().subscribe(
        (data) => {

          if (data[0].cntnotificaciones > 0) {
            let cantidad = + data[0].cntnotificaciones
            let texto = '';
            if (cantidad = 1) {
              texto = 'Usted tiene ' + data[0].cntnotificaciones + ' notificación nueva';
            } else {
              texto = 'Usted tiene ' + data[0].cntnotificaciones + ' notificaciones nuevas';
            }

            this.alertService.showAlert(texto, 6000);
          }

          this.cantidadNotificaciones = data[0].cntnotificaciones ?? 0;

        },
        (err) => {
          this.cantidadNotificaciones = 0;
        }
      );
    } else {
      this.cantidadNotificaciones = 0;
      this.nIntervId = clearInterval(this.nIntervId);
      // console.log("data>>nIntervId222222", this.nIntervId);
    }

  }

  allnotificaciones() {


    this.router.navigate(['./notificaciones'], {
      relativeTo: this.activatedRoute
    });

  }
  cerrarN() {
    this.showAlerts = false;
    console.log("cerrarN");
  }
  //ejecutar funcion cada 5 minutos
  // intervalo = setInterval(() => {
  //   this.muestranotificacion();
  // }, 60000);



  nIntervId;

  chagenotificaciones() {
    if (!this.nIntervId) {
      this.nIntervId = setInterval(() => {
        this.cantidadcnt();
      }, 30000);
    }
  }
  //mostrar fecha y horas en el dashboard

  // fechaActual = new Date().toLocaleString();
  // fechaActual = new Date().toLocaleDateString();
  // fechaActual = new Date().toLocaleTimeString();
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
  // fechaActual = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });


}
