import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { AsignacionesHardwareService } from 'src/app/core/services/asignaciones-hardware.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { HistorialHardModalListComponent } from '../../../hardware/componentes/historial-hard-modal-list/historial-hard-modal-list.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalHardwareDisponibleUserComponent } from '../modal-hardware-disponible-user/modal-hardware-disponible-user.component';
@Component({
  selector: 'app-asignaciones-Hardware-list',
  templateUrl: './asignaciones-Hardware-list.component.html',
  styleUrls: ['./asignaciones-Hardware-list.component.css'],
})
export class AsignacionesHardwareListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private envioMailService: EnvioMailService,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private asignacionesHardwareService: AsignacionesHardwareService
  ) {
    if (_vmP.idfk == null || _vmP.idfk == undefined) {

      this.router.navigate(['./../usuarios'], {
        relativeTo: this.activatedRoute,
      });

      return;
    }
  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [

    { name: 'idhardware', label: '#' },
    { name: 'desitems', label: 'Ítems' },

    { name: 'vmarca', label: 'Marca' },
    { name: 'vmodelo', label: 'Modelo' },
    { name: 'vnumerodeparte', label: 'Número Parte' },
    { name: 'vnumeroserie', label: 'Número de Serie' },
    { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
    { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
    // { name: 'vobservacion', label: 'vobservacion' }, 
    // { name: 'desestado', label: 'Estado' },
    { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },

  ];
  titulo: string = 'Asignaciones de';
  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    this.titulo = 'Asignaciones de ' + this.vmP.des1 + ' ' + this.vmP.des2;
    this.getData();
  }

  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'history',
      label: 'Historial',
      event: 'hist',
      tooltip: '',
    },
    {
      icon: 'person_add',
      label: 'Devolver',
      event: 'mant',
      tooltip: '',
      condition: true,
      contains: 'NO',
      data: 'mant',
    },
    {
      icon: 'engineering',
      label: 'A Mantención',
      event: 'irmant',
      tooltip: '',
      condition: true,
      contains: 'NO',
      data: 'irmant',
    },
    {
      icon: 'person_remove',
      label: 'Desasignar',
      event: 'desac',
      tooltip: '',
      condition: true,
      contains: 'NO',
      data: 'desac',
    },


    {
      icon: 'recycling',
      label: 'Recilar',
      event: 'recic',
      tooltip: '',
      condition: true,
      contains: 'NO',
      data: 'recic',
    },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idasiganacionhardware;




    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;


      case 'hist':
        // this.router.navigate(['hist'], {
        //   relativeTo: this.activatedRoute,
        // });
        this.abreModalhistorial(elementoIndex);

        break;
      case 'recic':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea reciclar el registro?',
              btnText: 'Si, Reciclar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.enviorecilaje(elementoIndex);
            }
          });

        break;
      case 'irmant':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea enviar a mantención ?',
              btnText: 'Si, Enviar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.envioMantencion(elementoIndex);
            }
          });

        break;
      case 'mant':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea devolver el hardware?',
              btnText: 'Si, devolver',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.enviodevolver(elementoIndex);
            }
          });

        break;
      case 'desac':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea desasignar el hardware?',
              btnText: 'Si, desasignar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.desasignar(elementoIndex);
            }
          });

        break;
      default:
        break;
    }
  }

  getData() {
    this.asignacionesHardwareService.getasignacionbyuser(this.vmP.idfk).subscribe(
      (data) => {
        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            desestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente',


            estadojson: JSON.stringify([{ color: this.colorEstado(element.cestado), descolumn: this.desestadoHardware(element.cestado) }]),
            nombreUsuario: element.nombreUsuario + ' ' + element.primerapellido,

            recic: element.cestado === 'D' ? 'SI' : element.cestado === 'M' ? 'SI' : 'NO',

            desac: element.cestado === 'A' ? 'SI' : 'NO',
            mant: element.cestado === 'M' ? 'SI' : 'NO',
            irmant: element.cestado === 'D' ? 'SI' : element.cestado === 'A' ? 'SI' : 'NO',
          };
        }
        );
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  desestadoHardware(estado: string): string {
    switch (estado) {
      case 'A':
        return 'Asignado';
      case 'D':
        return 'Disponible';
      case 'M':
        return 'Mantención';
      case 'R':
        return 'Reciclado';
      default:
        return '';
    }
  }
  colorEstado(estado: string): string {
    switch (estado) {
      case 'A':
        return 'bg-secondary';
      case 'D':
        return 'bg-success';
      case 'M':
        return 'bg-warning';
      case 'R':
        return 'bg-danger';
      default:
        return '';
    }
  }


  abreModalhistorial(data: any) {
    let bottonSheet = this._bottomSheet.open(HistorialHardModalListComponent, {

      data: data,
      disableClose: false,
      backdropClass: 'backdropClass',

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // this.router.navigateByUrl('');
      if (result == true) {
        this.getData();
      }
    });
  }



  envioMantencion(data: any) {

    let modeloAsignaion = {
      idusuario: data.usuarioAsignado,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "M",
      idasignacion: data.idasiganacionhardware
    };
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha enviado a mantención correctamente .');
        this.envioMailMantencion(data[0]);
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      }
    );
  }


  envioMailMantencion(usuario: any) {



    let modeloMail = {
      titulo: "Actualización de Hardware",
      subtitulo: "Se le ha enviado a mantención  un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se ha enviado a mantención un dispositivo a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Actualización de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.getData();
  }


  desasignar(data: any) {
    console.log(data)
    let modeloAsignaion = {
      idusuario: data.usuarioAsignado,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "D",
      idasignacion: data.idasiganacionhardware
    };
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha desasignado correctamente .');
        this.envioMaildesasignar(data[0]);
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      }
    );
  }

  envioMaildesasignar(usuario: any) {



    let modeloMail = {
      titulo: "Actualización de Hardware",
      subtitulo: "Se le ha desasignado un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se ha desasignado  un dispositivo a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Actualización de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.getData();
  }

  enviorecilaje(data: any) {

    let modeloAsignaion = {
      idusuario: data.usuarioAsignado,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "R",
      idasignacion: data.idasiganacionhardware
    };
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha asignado correctamente .');
        if (data.data.usuarioAsignado != null) {
          this.envioMailMantencion(data[0]);
        } else {
          this.getData();
        }
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      }
    );
  }


  envioMailrecilaje(usuario: any) {



    let modeloMail = {
      titulo: "Actualización de Hardware",
      subtitulo: "Se le ha enviado a recilaje un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se ha enviado a recilaje un dispositivo a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Actualización de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.getData();
  }

  enviodevolver(data: any) {

    let modeloAsignaion = {
      idusuario: data.usuarioAsignado,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "A",
      idasignacion: data.idasiganacionhardware
    };
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha asignado correctamente .');
        this.envioMaildevolver(data[0]);
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      }
    );
  }


  envioMaildevolver(usuario: any) {



    let modeloMail = {
      titulo: "Actualización de Hardware",
      subtitulo: "Se le ha devuelto de mantención un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se ha devuelto de mantención un dispositivo a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Actualización de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.getData();
  }

  cancelar() {
    this.router.navigate(['./../usuarios'], {
      relativeTo: this.activatedRoute,
    });
  }

  add() {

    this.dialog.open(ModalHardwareDisponibleUserComponent, {
      autoFocus: false,

      disableClose: false,

      data: {
        idusuario: this.vmP.idfk,
        idempresa: this.vmP.idfk5,

      },
    }).beforeClosed().subscribe((res) => {
      console.log(">>>>>>",res)
        this.getData();
     
    }
    );
    

  }

}
