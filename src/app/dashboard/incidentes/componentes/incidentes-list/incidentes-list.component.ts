
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-incidentes-list',
  templateUrl: './incidentes-list.component.html',
  styleUrls: ['./incidentes-list.component.css']
})
export class IncidentesListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private incidentesService: IncidentesService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private fb: FormBuilder,
    private procesosService: ProcesosService,
    private subprocesosService: SubprocesosService,
    private tareasService: TareasService,
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'nombre', label: 'Nombre', wrap: 1 },
    { name: 'factoresderiesgoestado', label: 'Factores de Riesgo', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
    { name: 'peligrodos', label: 'Peligros', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
    { name: 'peligroAdicionaldos', label: 'Peligros Adicionales', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
    { name: 'riesgodos', label: 'Riesgos', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },

    { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },

  ];

  tableDataMaintainer: Array<any>;
  filtrosbusquedaincidentes: FormGroup;

  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  centrosdetrabajo: any[] = [];

  ngOnInit(): void {

    this.filtrosbusquedaincidentes = this.fb.group({
      proceso: [''],
      actividad: [''],
      tarea: [''],
      idcentrodetrabajo: [''],
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
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;




    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
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
              this.incidentesService.delete(this.vmP.id).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro eliminado exitosamente'
                  );
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
          });

        break;
      default:
        break;
    }
  }

  getData() {

    const centrosdetrabajo = this.filtrosbusquedaincidentes.get('idcentrodetrabajo')?.value;
    const proceso = this.filtrosbusquedaincidentes.get('proceso')?.value;
    const actividad = this.filtrosbusquedaincidentes.get('actividad')?.value;
    const tarea = this.filtrosbusquedaincidentes.get('tarea')?.value;


    console.log("centrosdetrabajo", centrosdetrabajo);




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
    console.log("paramsString", paramsString);

    this.incidentesService.getallparams(paramsString).subscribe(
      (data) => {

        this.tableDataMaintainer = data.data.map((item: any) => {
          return {
            ...item,
            estadojson: JSON.stringify([{ descestado: item.esta_activo === true ? 'Activo' : 'Inactivo' }]),
            estado: item.esta_activo === true ? 'Activa' : 'Inactiva',

            factoresderiesgoestado: Array.isArray(item.factoresRiesgo)
              ? JSON.stringify(item.factoresRiesgo.map(f => ({ color: this.colorfactor(f.id), descolumn: f.nombre })))
              : '[]',
            peligrodos: Array.isArray(item.peligros)
              ? JSON.stringify(item.peligros.map(f => ({ color: 'bg-warning', descolumn: f.nombre })))
              : '[]',

            peligroAdicionaldos: JSON.stringify([{ color: 'bg-warning', descolumn: item.peligroAdicional.nombre }]),
            riesgodos: JSON.stringify([{ color: 'bg-warning', descolumn: item.riesgo.nombre }]),
          };
        });

        console.log(this.tableDataMaintainer);
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }


  colorfactor(factor: any): string {

    return 'bg-info';
    // switch (factor) {
    //   case 1:
    //     return 'bg-secondary';
    //   case 2:
    //     return 'bg-success';
    //   case 3:
    //     return 'bg-warning';
    //   case 4:
    //     return 'bg-primary';
    //   case 5:
    //     return 'bg-primary';
    //   default:
    //     return '';
    // }
  }
  desestadoHardware(estado: string): string {
    // Devuelve una descripción textual según el estado, puedes ajustar los textos según tu lógica de negocio
    switch (estado) {
      case 'A':
        return 'Activo';
      case 'D':
        return 'Disponible';
      case 'M':
        return 'Mantenimiento';
      case 'R':
        return 'Retirado';
      default:
        return '';
    }
  }

  getDatacentrodetrabajos() {


    this.centrosdetrabajosService.getall().subscribe(
      (data) => {
        this.centrosdetrabajo = data.data;
      },
      (err) => {
        this.centrosdetrabajo = [];
      }
    );
  }


  
  getDataprocesos(idcentrodetrabajo : any) {

    const paramprocesos = `centroTrabajoId=${idcentrodetrabajo}`;
  
    this.procesosService.getallparams(paramprocesos).subscribe(
      (data) => {

        this.procesos = data.data 
        
      },
      (err) => {
        this.procesos = [];
      }
    );
  }

  getDataSubProcesos(idprocesos: any) {

    const paramssub = `procesoId=${idprocesos}`;
  
    this.subprocesosService.getallparams(paramssub).subscribe(
      (data) => {

        this.actividades = data.data 
        
      },
      (err) => {
        this.actividades = [];
      }
    );
  }

  
  getDataStareas(idsubprocsos: any) {

    const paramssub = `subProcesoId=${idsubprocsos}`;
  
    this.tareasService.getallparams(paramssub).subscribe(
      (data) => {

        this.tareas = data.data 
        
      },
      (err) => {
        this.tareas = [];
      }
    );
  }



}
