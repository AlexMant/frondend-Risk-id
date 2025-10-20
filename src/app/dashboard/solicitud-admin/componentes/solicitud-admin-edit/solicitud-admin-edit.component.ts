import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { DireccionesService } from 'src/app/core/services/direcciones.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { SubMenueditSolicitudUserListService } from 'src/app/dashboard/solicitud-user/componentes/solicitud-user-edit/sub-menueditsolicitud-user-list.service';
import { ModalAdminAsignacionUserComponent } from '../modal-admin-asignacion-user/modal-admin-asignacion-user.component';
import { ModalSolicitaRetiroComponent } from '../modal-solicita-retiro/modal-solicita-retiro.component';
import { ModalGenerarCotizacionComponent } from '../modal-generar-cotizacion/modal-generar-cotizacion.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-solicitud-admin-edit',
  templateUrl: './solicitud-admin-edit.component.html',
  styleUrls: ['./solicitud-admin-edit.component.css']
})
export class SolicitudAdminEditComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private readonly fb: FormBuilder,
    private direccionesService: DireccionesService,
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private envioMailService: EnvioMailService,
    private readonly subMenuSolicitudUserListService: SubMenueditSolicitudUserListService,
    private _vmP: VmParametrosService,

  ) {
    if (this.vmP.idfk2 == null || this.vmP.idfk2 == undefined) {
      this.router.navigate(['./../list'], {
        relativeTo: this.activatedRoute
      });
    }

  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  tipoSolExistente: boolean = true;
  tipoSolNuevo: boolean = false;
  preloader: boolean = false;

  get vmP() {
    return this._vmP;
  }

  vcodigosolicitud: any;
  fecha_string: any;
  vobservacion: any;
  desdireccion: any;
  idusuario: any;
  nombreusuario: any;
  apellidoUsuario: any;
  mailusuario: any;
  idempresa: any;

  mantenedorFormSolUser!: FormGroup;

  ngOnInit(): void {
    this.getDatacabecera();
    this.getDatadetalle();
    this.selectTipo(this.vmP.idfk3)

    this.mantenedorFormSolUser = this.fb.group({

      idestado: [{value:this.vmP.idfk5,disabled: !this.vmP.solicitudEditable},],
      observacion:  [{value:this.vmP.des5,disabled: !this.vmP.solicitudEditable},],

    });

  }




  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuSolicitudUserListService.dataColumnEditSolicituduser(this.vmP.idfk3);

  actionsMaintainer: Array<ActionInterface> = this.subMenuSolicitudUserListService.datasubMenuEditSolicituduser(this.vmP.idfk3);

  tableDataMaintainer: Array<any>;

  dataCotizada: any = [];
  getDatadetalle() {


    this.solicitudService.getdetallesolicitud(this.vmP.idfk2).subscribe(
      (data) => {
        console.log("detallesolitiud>>>>>", data)
        this.dataCotizada = data;
        this.tableDataMaintainer = data;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  estadjoson: any = {}
  colorestados: any;
  getDatacabecera() {


    this.solicitudService.getcabecerasolicitud(this.vmP.idfk2).subscribe(
      (data) => {
        console.log("getconsultasolicitud", data)
        this.vcodigosolicitud = data[0].vcodigosolicitud;
        this.fecha_string = data[0].fecha_string;
        this.vobservacion = data[0].vobservacion;
        this.desdireccion = data[0].desdireccion;
        this.idusuario = data[0].idusuariogenerador;
        this.nombreusuario = data[0].nombregenerador;
        this.apellidoUsuario = data[0].apellidogenerador;
        this.mailusuario = data[0].mailgenerador;
        this.idempresa = data[0].idempresa;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );

  }

  selectTipo(event: any) {
    console.log(event);
    this.vmP.detallaherdsolicitud = [];
    if (event == 'M') {
      this.tipoSolNuevo = false;
      this.tipoSolExistente = true;
    }
    if (event == 'N') {
      this.tipoSolNuevo = true;
      this.tipoSolExistente = false;
    }
    if (event == '') {
      this.tipoSolNuevo = false;
      this.tipoSolExistente = false;
    }
    // this.vmP.modeloUserUsuario.tiposolicitud = event;


  }

  desestadosolicitud(estado: any): string {
    switch (estado) {
      case 1:
        return 'Abierta';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Cerrada';
      case 0:
        return 'Sin Estado';
      default:
        return '';
    }
  }
  colorEstado(estado: any): string {
    switch (estado) {
      case 3:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';

      default:
        return '';
    }
  }

  volver() {


    this.router.navigate(['./../list'], {
      relativeTo: this.activatedRoute
    });
  }


  guardar() {

    let estado = this.mantenedorFormSolUser.get('idestado')?.value ?? 0;
    let observacion = this.mantenedorFormSolUser.get('observacion')?.value ?? '';
    if (estado == 3) {
      if (observacion == '') {
        this.snackbar.notify(
          'danger',
          'El estado cerrado requiere una observación'
        );
        return;
      }

    }

    let bodypaso3 = {
      // idsolcitud: 0,
      //convert string empresa a int



      idsolicitud: this.vmP.idfk2,
      vobservacion: observacion,
      idestado: estado,
      idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??0),
      desestado: this.desestadosolicitud(estado),
    };


    this.dialog
      .open(ConfirmModalComponent, {
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        width: '400px',
        data: {
          type: 'warning',
          title: 'Actualizar Solicitud',
          titleventana: 'Actualizar Solicitud',
          message: '¿Seguro que desea actualizar la solicitud a '+this.desestadosolicitud(estado)+'?',
          btnText: 'Si, Seguro',
          btnTextSecondary: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.preloader = true;
          this.solicitudService.updateestadosolicitud(bodypaso3).subscribe(
            (data) => {
              console.log("data", data);
              if (estado == 3) {
                this.enviaMail();
              }else{
                this.volver();
              }

            },
            (err) => {
              console.log("err", err);
              this.preloader = false;
              this.snackbar.notify('danger', 'Error al actualizar la solicitud');

            }
          );
        }
      });
    // this.preloader = true;


  }


  abreasignaciones() {
    let bottonSheet = this._bottomSheet.open(ModalAdminAsignacionUserComponent, {

      data: this.idusuario,
      disableClose: false,
      backdropClass: 'backdropClass',

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // this.router.navigateByUrl('');

   

    });
  }

  solicitaretirohardware() {
    let bottonSheet = this._bottomSheet.open(ModalSolicitaRetiroComponent, {

      data: this.idempresa,
      disableClose: false,
      backdropClass: 'backdropClass',

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.volver();
      }

    });
  }


  generarcotizaion() {
    let bottonSheet = this._bottomSheet.open(ModalGenerarCotizacionComponent, {

      data: JSON.stringify(this.dataCotizada),
      disableClose: false,
      backdropClass: 'backdropClass',

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.volver();
      }

    });
  }

  //   vcodigosolicitud: any;
  //   fecha_string: any;
  //   vobservacion: any;
  //   desdireccion:any;
  //  idusuario: any;
  //  nombreusuario:any;
  //  apellidoUsuario:any;
  //  mailusuario:any;
  //  idempresa:any;

  enviaMail() {


    let modeloMail = {
      titulo: "Solicitud Cerrada",
      subtitulo: "Se ha cerrado una solicitud",
      textouno: "" + this.nombreusuario + ", se ha cerrado su  solicitud con el código  " + this.vcodigosolicitud + ".",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Cierre de solicitud",
      nombre: this.nombreusuario + ' ' + this.apellidoUsuario,
      email: this.mailusuario,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();


    this.volver();
  }

}
