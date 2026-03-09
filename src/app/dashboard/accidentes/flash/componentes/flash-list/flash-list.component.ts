import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { FlashService } from 'src/app/core/services/flash.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

import orderBy from 'lodash/orderBy';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-flash-list',
  templateUrl: './flash-list.component.html',
  styleUrls: ['./flash-list.component.css'],
})
export class FlashListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private flashService: FlashService,
    private procesosService: ProcesosService,
    private subprocesosService: SubprocesosService,
    private tareasService: TareasService,
    private fb: FormBuilder,
    private centrosdetrabajosService: CentrosdetrabajosService,
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'codigo', label: 'Codigo' },
    { name: 'fechadeOcurrenciaFormat', label: 'Fecha Ocurrencia' },
    { name: 'nombre', label: 'Nombre' },
    // { name: 'fechaOcurrencia', label: 'Fecha Ocurrencia', type: 'date', format: 'd , MMMM y, HH:mm', wrap: 0 },
    { name: 'descripcion', label: 'Descripción' },



    // { name: 'danoProtencialId', label: 'Dano Potencial' }, 
    // { name: 'danoRealId', label: 'Dano Real' }, 
    // { name: 'ubicacionId', label: 'Ubicacion' }, 
    // { name: 'lugarEspecifico', label: 'Lugar Especifico' }, 
    // { name: 'tareaId', label: 'Tarea' }, 
    // { name: 'medidaInmediata', label: 'Medida Inmediata' }, 

  ];
  tableDataMaintainer: Array<any>;
  filtrobusquedaflash: FormGroup;

  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  centrosdetrabajo: any[] = [];

  ngOnInit(): void {


    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);
    const idEmpresa = userInfo?.empresaId?.[0]?.empresaId ?? 0;


    this.filtrobusquedaflash = this.fb.group({
      proceso: [''],
      actividad: [''],
      tarea: [''],
      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
    });

    this.getDatacentrodetrabajos();

    this.getData();

  }

  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'edit',
      label: 'Editar',
      event: 'edit',
      tooltip: '',
    },

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
    },
    {
      icon: 'visibility',
      label: 'Reporte FLash',
      event: 'ver',
      tooltip: '',

    },

  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;

    this.vmP.detalleflash = elementoIndex;


    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'ver':
        this.router.navigate(['ver'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'delete':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            width: '320px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea eliminar el registro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.flashService.delete(this.vmP.id).subscribe({
                next: (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro eliminado exitosamente'
                  );
                  // this.getData();
                },
                error: (err) => {
                  console.log(err);
                  this.snackbar.notify(
                    'danger',
                    'Error al intentar actualizar el registro.'
                  );
                },
                complete: () => {
                  this.getData();
                }
              }
              );
            }
          });

        break;
      default:
        break;
    }
  }

  getData() {
    const datePipe2 = new DatePipe('es');


    const centrosdetrabajo = this.filtrobusquedaflash.get('idcentrodetrabajo')?.value;
    const proceso = this.filtrobusquedaflash.get('proceso')?.value;
    const actividad = this.filtrobusquedaflash.get('actividad')?.value;
    const tarea = this.filtrobusquedaflash.get('tarea')?.value;
    const fechainicio = datePipe2.transform(this.filtrobusquedaflash.get('fecha_desde')?.value, 'yyyy-MM-dd');
    const fechaFin = datePipe2.transform(this.filtrobusquedaflash.get('fecha_hasta')?.value, 'yyyy-MM-dd');

    console.log("centrosdetrabajo", centrosdetrabajo);

    if (this.filtrobusquedaflash.get('fecha_desde')?.value > this.filtrobusquedaflash.get('fecha_hasta')?.value) {
      this.snackbar.notify(
        'danger',
        'Error la fecha DESDE debe ser menor a la fecha de HASTA'
      );

      return
    }

      if (fechaFin == null && fechainicio != null) {
      this.snackbar.notify(
        'danger',
        'Error seleccione fecha Hasta'
      );
      return
    }
    if (fechaFin != null && fechainicio == null) {
      this.snackbar.notify(
        'danger',
        'Error seleccione fecha Desde'
      );
      return
    }


    let paramsString = '';
    if (centrosdetrabajo) {
      paramsString += `centroTrabajoId=${centrosdetrabajo}&`;
    }
    if (proceso) {
      paramsString += `procesoId=${proceso}&`;
    }
    if (actividad) {
      paramsString += `subProcesoId=${actividad}&`;
    }
    if (tarea) {
      paramsString += `tareaId=${tarea}&`;
    }
    if (fechainicio && fechaFin) {
      paramsString += `fechaDesde=${fechainicio}&fechaHasta=${fechaFin}`;
    }


    console.log("paramsString", paramsString);

    this.flashService.getbyparams(paramsString).subscribe({
      next: (data) => {
        console.log("data incidentes", data.data);
        this.tableDataMaintainer = data.data.map((item: any) => {
          // Validaciones para evitar errores de undefined

          return {
            ...item,
            codigo: 'INC-' + item.empresaId.toString().padStart(3, '0') + '-' + item.centroTrabajoId.toString().padStart(4, '0') + '-' + item.id.toString().padStart(5, '0'),
            fechadeOcurrenciaFormat: new Date(item.fechaOcurrencia).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }) + ' ' + new Date(item.fechaOcurrencia).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }) + ' hrs.'

          };
        });

        this.tableDataMaintainer = orderBy(this.tableDataMaintainer, ['id'], ['desc']);
        console.log(this.tableDataMaintainer);
      },
      error: (err) => {
        this.tableDataMaintainer = [];
      }
    });
  }



  add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }




  getDatacentrodetrabajos() {


    this.centrosdetrabajosService.getall().subscribe({
      next: (data) => {
        this.centrosdetrabajo = data.data;
      },
      error: (err) => {
        this.centrosdetrabajo = [];
      }
    });
  }



  getDataprocesos(idcentrodetrabajo: any) {

    const paramprocesos = `centroTrabajoId=${idcentrodetrabajo}`;

    this.procesosService.getallparams(paramprocesos).subscribe({
      next: (data) => {

        this.procesos = data.data

      },
      error: (err) => {
        this.procesos = [];
      }
    });
  }

  getDataSubProcesos(idprocesos: any) {

    this.filtrobusquedaflash.patchValue({
      actividad: '',
      tarea: ''
    });
    const paramssub = `procesoId=${idprocesos}`;
    console.log("paramssub", paramssub);
    if (idprocesos !== 0 && idprocesos !== '') {

      this.subprocesosService.getallparams(paramssub).subscribe({
        next: (data) => {

          this.actividades = data.data

        },
        error: (err) => {
          this.actividades = [];
        }
      });
    } else {
      this.actividades = [];
    }
  }


  getDataStareas(idsubprocsos: any) {

    const paramssub = `subProcesoId=${idsubprocsos}`;

    if (idsubprocsos !== 0 && idsubprocsos !== '') {
      this.tareasService.getallparams(paramssub).subscribe({
        next: (data) => {

          this.tareas = data.data

        },
        error: (err) => {
          this.tareas = [];
        }
      });
    } else {
      this.tareas = [];
    }
  }


}
