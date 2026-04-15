
import { Component, OnInit } from '@angular/core';
import orderBy from 'lodash/orderBy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { PermisoService } from 'src/app/core/services/permiso.service';

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
    private readonly magnitudesService: MagnitudesService,
     public permisoService: PermisoService
 ) {
      
    const permisover = this.permisoService.tienePermisoCompuesto('ADMINISTRACION_INCIDENTES', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }
     

  }


  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'nombre', label: 'Descripción del evento', wrap: 1 },

    { name: 'procesoNombre', label: 'Proceso', wrap: 1 },
    { name: 'subProcesoNombre', label: 'Actividad', wrap: 1 },
    { name: 'tareaNombre', label: 'Tarea', wrap: 1 },

    { name: 'valorRiesgoPuro', label: 'Riesgo Puro', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
    // { name: 'valorRiesgoResidual', label: 'Riesgo Residual', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },


    // { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },

  ];

  tableDataMaintainer: Array<any>;
  filtrosbusquedaincidentes: FormGroup;

  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  centrosdetrabajo: any[] = [];

  ngOnInit(): void {


    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);
    const idEmpresa = userInfo?.empresaId?.[0]?.empresaId ?? 0;
    this.getdatamagnitudes(idEmpresa);


    this.filtrosbusquedaincidentes = this.fb.group({
      proceso: [''],
      actividad: [''],
      tarea: [''],
      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
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
      condition: true,
      contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
      data: 'permisosEdit',
    },
    {
      icon: 'visibility',
      label: 'Ver',
      event: 'edit',
      tooltip: '',
      condition: true,
      contains: 'SI',   //si es NO deja eleiminar si es SI deja eliminar
      data: 'permisosEdit',
    },

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
      condition: true,
      contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
      data: 'permisosDelete',
    },
    {
      icon: 'print',
      label: 'Imprimir',
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
    this.vmP.dataincidentetablavep = elementoIndex;



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
        console.log("data incidentes", data.data);
        this.tableDataMaintainer = data.data.map((item: any) => {
          // Validaciones para evitar errores de undefined
          const caracterizacion = Array.isArray(item.caracterizaciones) && item.caracterizaciones.length > 0 ? item.caracterizaciones[0] : {};
          const evaluacion = caracterizacion && Array.isArray(caracterizacion.evaluacion) && caracterizacion.evaluacion.length > 0 ? caracterizacion.evaluacion[0] : {};
          const consecuenciaRPuro = evaluacion && evaluacion.consecuenciaRPuro ? evaluacion.consecuenciaRPuro : { valor: 0 };
          const consecuenciaRResidual = evaluacion && evaluacion.consecuenciaRResidual ? evaluacion.consecuenciaRResidual : { valor: 0 };
          const probabilidadRPuro = evaluacion && evaluacion.probabilidadRPuro ? evaluacion.probabilidadRPuro : { valor: 0 };
          const probabilidadRResidual = evaluacion && evaluacion.probabilidadRResidual ? evaluacion.probabilidadRResidual : { valor: 0 };
          const magnitudRPuro = evaluacion && evaluacion.magnitudRPuro ? evaluacion.magnitudRPuro : { nombre: '' };
          const magnitudRResidual = evaluacion && evaluacion.magnitudRResidual ? evaluacion.magnitudRResidual : { nombre: '' };

          return {
            ...item,
            estadojson: JSON.stringify([{ descestado: item.esta_activo === true ? 'Activo' : 'Inactivo' }]),
            estado: item.esta_activo === true ? 'Activa' : 'Inactiva',
            valorRiesgoPuro: JSON.stringify([
              {
                color: this.getColorVEP((consecuenciaRPuro.valor || 0) * (probabilidadRPuro.valor || 0)),
                descolumn: this.calcularmagnitud((consecuenciaRPuro.valor || 0) * (probabilidadRPuro.valor || 0), magnitudRPuro.nombre) + ' (' + (consecuenciaRPuro.valor || 0) * (probabilidadRPuro.valor || 0) + ')'
              }
            ]),
            valorRiesgoResidual: JSON.stringify([
              {
                color: this.getColorVEP((consecuenciaRResidual.valor || 0) * (probabilidadRResidual.valor || 0)),
                descolumn: this.calcularmagnitud((consecuenciaRResidual.valor || 0) * (probabilidadRResidual.valor || 0), magnitudRResidual.nombre) + ' (' + (consecuenciaRResidual.valor || 0) * (probabilidadRResidual.valor || 0) + ')'
              }
            ]),
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMINISTRACION_INCIDENTES', 'editar') ? 'SI' : 'NO',
          permisosDelete: this.permisoService.tienePermisoCompuesto('ADMINISTRACION_INCIDENTES', 'eliminar') ? 'SI' : 'NO',
          };
        });
        this.tableDataMaintainer = orderBy(this.tableDataMaintainer, ['id'], ['desc']);

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



  getDataprocesos(idcentrodetrabajo: any) {

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


  getColorVEP(valor: number): string {
    if (valor <= 0) return 'bg-white'; // blanco
    if (valor < 5) return 'bg-aceptable'; // verde
    if (valor < 13) return 'bg-moderado'; // bg-warning amarillo
    if (valor < 64) return 'bg-inaceptable'; // naranja
    return 'bg-inaceptable'; // rojo
  }

  magnitudes: any[] = [];
  getdatamagnitudes(idempresa) {

    this.magnitudesService.getallbyempresa(idempresa).subscribe(
      (data) => {
        this.magnitudes = data.data;
        console.log("data magnitudes", data);
      },
      (err) => {
        this.magnitudes = [];
      }
    );

  }

  calcularmagnitud(resultado: number, nombreMagnitud: string): string {
    if (resultado <= 0) {
      return 'Sin Magnitud';
    }
    if (nombreMagnitud && nombreMagnitud !== '') {
      return nombreMagnitud;
    }
    let magnitudEncontrada = this.magnitudes.find(
      (m: any) => resultado >= m.valorMin && resultado <= m.valorMax
    );
  
    if (!magnitudEncontrada) {
      // Si el resultado es menor que todos los valorMin, seleccionar el de valorMin más bajo
      const minMagnitud = this.magnitudes.reduce((prev: any, curr: any) =>
        prev.valorMin < curr.valorMin ? prev : curr
      );
      const maxMagnitud = this.magnitudes.reduce((prev: any, curr: any) =>
        prev.valorMax > curr.valorMax ? prev : curr
      );
      if (resultado < minMagnitud.valorMin) {
        magnitudEncontrada = minMagnitud;
      } else if (resultado > maxMagnitud.valorMax) {
        // Si el resultado es mayor que todos los valorMax, seleccionar el de valorMax más cercano
        magnitudEncontrada = this.magnitudes
          .filter((m: any) => m.valorMax <= resultado)
          .sort((a: any, b: any) => b.valorMax - a.valorMax)[0] || maxMagnitud;
      }
    }
    return magnitudEncontrada ? magnitudEncontrada.nombre : 'Sin Magnitud';
  }


}
