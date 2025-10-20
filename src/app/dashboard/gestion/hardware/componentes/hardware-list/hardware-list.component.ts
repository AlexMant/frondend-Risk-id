import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HardwareService } from 'src/app/core/services/hardware.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { ItemsService } from 'src/app/core/services/items.service';
import { SubMenuhardwreListService } from '../sub-menu-hardware-list.service';
import { AsignarUsuarioComponent } from '../asignar-usuario/asignar-usuario.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsignacionesHardwareService } from 'src/app/core/services/asignaciones-hardware.service';
import { HistorialHardModalListComponent } from '../historial-hard-modal-list/historial-hard-modal-list.component';
import { ModalCargaXlsComponent } from '../modal-carga-xls/modal-carga-xls.component';
@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css'],
})
export class HardwareListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,

    private readonly fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private envioMailService: EnvioMailService,
    private _vmP: VmParametrosService,
    private hardwareService: HardwareService,
    private asignacionesHardwareService: AsignacionesHardwareService

    , private readonly empresaService: EmpresaService
    , private readonly itemsService: ItemsService
    , private readonly subMenuhardwreListService: SubMenuhardwreListService
  ) {



  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get vmP() {
    return this._vmP;
  }
  mantenedorFormHardware!: FormGroup;

  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloUsuario: any = {
    idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    empresa: null,
    estado: null,
    items: null,
  }


  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuhardwreListService.dataColumnhardwre(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuhardwreListService.datasubMenuHardware(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    // this.getData();
    
    this.getdataEmpresa();
    this.getdataitems();
    this.mantenedorFormHardware = this.fb.group({
      items: [this.modeloUsuario.items],
      estado: [this.modeloUsuario.estado],
      empresa: [this.modeloUsuario.empresa],

    });

    if (this.vmP.filtrosardware.busquedaActiva) {
      this.modeloUsuario.items = this.vmP.filtrosardware.items;
      this.modeloUsuario.estado = this.vmP.filtrosardware.estado;
      this.modeloUsuario.empresa = this.vmP.filtrosardware.empresa;

      if(this.vmP.filtrosardware.items != null && this.vmP.filtrosardware.items != ''){
        this.mantenedorFormHardware.patchValue({ ['items']: this.vmP.filtrosardware.items })
      }
      if(this.vmP.filtrosardware.estado != null && this.vmP.filtrosardware.estado != ''){
        this.mantenedorFormHardware.patchValue({ ['estado']: this.vmP.filtrosardware.estado })
      }
      if(this.vmP.filtrosardware.empresa != null && this.vmP.filtrosardware.empresa != ''){
        this.mantenedorFormHardware.patchValue({ ['empresa']: this.vmP.filtrosardware.empresa })
      }
      this.getData();
    }
  }



  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idhardware;
    this.vmP.idfk2 = elementoIndex.idhardware;



    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'asigna':
        this.abreModalAsignar(elementoIndex);
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
      case 'activ':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea Activar el registro?',
              btnText: 'Si, Activar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              let estado_hardware = {
                idhardware: this.vmP.id,
                cestado: 'D'
              }
              this.hardwareService.cambiaestado(this.vmP.id, estado_hardware).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro activado exitosamente'
                  );
                  this.getData();
                },
                (err) => {
                  console.log(err);
                  this.snackbar.notify(
                    'danger',
                    'Error al intentar actiar el registro.'
                  );
                }
              );
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
              message: '¿Seguro que desea devolver al usuario?',
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
              message: '¿Seguro que desea desasignar al usuario?',
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

  getBuscar() {

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormHardware.get('empresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }


    this.vmP.filtrosardware.idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario,
      this.vmP.filtrosardware.empresa = idempresa;
    this.vmP.filtrosardware.estado = this.mantenedorFormHardware.get('estado')?.value ?? "0",
      this.vmP.filtrosardware.items = this.mantenedorFormHardware.get('items')?.value ?? 0,
      this.vmP.filtrosardware.busquedaActiva = true;
    this.getData();
  }

  getData() {




    this.hardwareService.getallhardware(this.vmP.filtrosardware).subscribe(
      (data) => {
        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            desestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente',
            estado: element.estado === 'V' ? 'V' : 'N',
            // usuarioAsignado: element.usuarioAsignado??0,
            estadojson: JSON.stringify([{ color: this.colorEstado(element.cestado), descolumn: this.desestadoHardware(element.cestado) }]),
            nombreUsuario: element.nombreUsuario + ' ' + element.primerapellido,
            asigna: element.cestado === 'D' ? 'SI' : 'NO',
            recic: element.cestado === 'D' ? 'SI' : element.cestado === 'M' ? 'SI' : 'NO',
            activ: element.cestado === 'R' ? 'SI' : 'NO',
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
  // <mat-option value="A">Asignado</mat-option>
  // <mat-option value="D">Disponible</mat-option>
  // <mat-option value="M">Mantención</mat-option>
  // <mat-option value="R">Reciclado</mat-option>

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


  dataitems: any[] = [];
  getdataitems() {
    this.itemsService.getall().subscribe(
      (data) => {
        this.dataitems = data


      },
      (err) => {
        this.dataitems = [];
      }
    );
  }


  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }


  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }
  bodegas() {
    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormHardware.get('empresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }

    if (idempresa == 0 || idempresa == null || idempresa == undefined) {
      this.snackbar.notify(
        'danger',
        'Debe seleccionar una empresa.'
      );
      return;
    }
    this.vmP.idfk3 = idempresa;

    this.router.navigate(['bode'], {
      relativeTo: this.activatedRoute,
    });
  }
  abremodalcarga() {

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormHardware.get('empresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }

    if (idempresa == 0 || idempresa == null || idempresa == undefined) {
      this.snackbar.notify(
        'danger',
        'Debe seleccionar una empresa.'
      );
      return;
    }
 

    let bottonSheet = this._bottomSheet.open(ModalCargaXlsComponent, {

      data: {idempresa: idempresa},
      disableClose: true,
      autoFocus: false,
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

  abreModalAsignar(data: any) {
    let bottonSheet = this._bottomSheet.open(AsignarUsuarioComponent, {

      data: data,
      disableClose: true,
      autoFocus: false,
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

  abreModalhistorial(data: any) {
    let bottonSheet = this._bottomSheet.open(HistorialHardModalListComponent, {

      data: data,
      disableClose: false,
       autoFocus: false,

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
        console.log("res",data)
        this.snackbar.notify('success', 'Enviado a mantención correctamente .');
        if (data[0].mail != null && data[0].mail != undefined && data[0].mail != '') {
          this.envioMailMantencion(data[0]);
        }  
        this.getData();
       
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
        this.snackbar.notify('success', 'Desasignado correctamente .');
        if (data[0].mail != null && data[0].mail != undefined && data[0].mail != '') {
        this.envioMaildesasignar(data[0]);
        }
        this.getData();
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
   
  }

  enviorecilaje(data: any) {
   
    let modeloAsignaion = {
      idusuario: data.usuarioAsignado??0,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "R",
      idasignacion: data.idasiganacionhardware
    };
     
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Asignado correctamente .');
       console.log("res",data)
        if (data[0].mail != null && data[0].mail != undefined && data[0].mail != '') {
          this.envioMailrecilaje(data[0]);
        }  
          this.getData();
        
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
   
  }

  enviodevolver(data: any) {

    let modeloAsignaion = {
      idusuario: data.usuarioAsignado,
      idhardware: data.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "A",
      idasignacion: data.idasiganacionhardware
    };
    console.log(modeloAsignaion)
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Devuelto de mantención correctamente .');
        if (data[0].mail != null && data[0].mail != undefined && data[0].mail != '') {
        this.envioMaildevolver(data[0]);
        }
        this.getData();
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
   
  }

  

}
