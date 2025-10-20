import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { AsignacionesHardwareService } from 'src/app/core/services/asignaciones-hardware.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { HardwareService } from 'src/app/core/services/hardware.service';
import { ItemsService } from 'src/app/core/services/items.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { HistorialHardModalListComponent } from '../../../hardware/componentes/historial-hard-modal-list/historial-hard-modal-list.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-modal-hardware-disponible-user',
  templateUrl: './modal-hardware-disponible-user.component.html',
  styleUrls: ['./modal-hardware-disponible-user.component.css']
})
export class ModalHardwareDisponibleUserComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalHardwareDisponibleUserComponent>
    , private readonly itemsService: ItemsService
    , private _bottomSheet: MatBottomSheet
    , private hardwareService: HardwareService
    ,private readonly fb: FormBuilder
    ,private _vmP: VmParametrosService,
    private envioMailService: EnvioMailService,
    private snackbar: NotificationService,
    private dialog: MatDialog,
    private asignacionesHardwareService: AsignacionesHardwareService) { }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  preloader = false;
  idempresa: any;
  idusuario: any;
  idasignacion

  modeloBuscardisponible: any = {
     
    empresa: this.vmP.idfk5,
    items: null,
    marca: null,
    modelo: null,
    serie: null,
   
  }


  ngOnInit(): void {
    if (this.data) {
      this.idempresa = this.data.idempresa;
      this.idusuario =  this.data.idusuario; 
      this.idasignacion = this.data.idasignacion;

    }
    this.getdataitems();
    this.mantenedorFormHardware = this.fb.group({
      items: [this.modeloBuscardisponible.items],
      marca: [this.modeloBuscardisponible.marca],
      modelo: [this.modeloBuscardisponible.modelo],
      serie: [this.modeloBuscardisponible.serie],

    });
  }

  get vmP() {
    return this._vmP;
  }

  close() {
    this.dialogRef.close();
  }

  closeAction() {
    this.dialogRef.close(true);
  }

  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  mantenedorFormHardware!: FormGroup;
 
  tableDataMaintainer: Array<any>;
  getData() {


    this.modeloBuscardisponible.items = this.mantenedorFormHardware.get('items')?.value?? 0;
    this.modeloBuscardisponible.marca = this.mantenedorFormHardware.get('marca')?.value??"";
    this.modeloBuscardisponible.modelo = this.mantenedorFormHardware.get('modelo')?.value??"";
    this.modeloBuscardisponible.serie = this.mantenedorFormHardware.get('serie')?.value??"";


    this.hardwareService.gethardwaredisponible( this.modeloBuscardisponible).subscribe(
      (data) => {
        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            desestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente',
            estado: element.estado === 'V' ? 'V' : 'N',

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

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idhardware', label: '#' },
    { name: 'desitems', label: 'Ítems' },

    { name: 'vdesbodega', label: 'Bodega' },
    { name: 'vmarca', label: 'Marca' },
    { name: 'vmodelo', label: 'Modelo' },
    { name: 'vnumerodeparte', label: 'Número Parte' },
    { name: 'vnumeroserie', label: 'Número de Serie' },
    { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
    { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
    // { name: 'vobservacion', label: 'vobservacion' }, 
    // { name: 'desestado', label: 'Estado' },
    // { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },

  ];

  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'history',
      label: 'Historial',
      event: 'hist',
      tooltip: '',
    },
    {
      icon: 'person_add',
      label: 'Asignar',
      event: 'asigna',
      tooltip: '',
      condition: true,
      contains: 'NO',
      data: 'asigna',
    },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    // this.vmP.id = elementoIndex.idbodega;

    switch (e.event) {
      case 'hist':
        // this.router.navigate(['hist'], {
        //   relativeTo: this.activatedRoute,
        // });
        this.abreModalhistorial(elementoIndex);

        break;
      case 'asigna':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea Asignar el hardware?',
              btnText: 'Si, Asignar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
           
              this.asignarHardware(elementoIndex);
            
          });

        break;
      default:
        break;
    }
  }


  abreModalhistorial(data: any) {
    let bottonSheet = this._bottomSheet.open(HistorialHardModalListComponent, {

      data: data,
      disableClose: false,
       

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


  asignarHardware(elementoIndex: any) {


    let modeloAsignaion = {
      idusuario: this.idusuario,
      idhardware: elementoIndex.idhardware,
      idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      cestado: "A",
      idasignacion: null
    };
    this.asignacionesHardwareService.insasignacion(modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha asignado correctamente .');
        this.envioMail(data[0]);
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

  envioMail(usuario: any) {



    let modeloMail = {
      titulo: "Asignación de Hardware",
      subtitulo: "Se le ha asignado un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se le ha asignado un hardware a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Asignación de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.preloader = false;
    this.getData();

  }



}
