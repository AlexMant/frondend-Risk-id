import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-procesos-add',
  templateUrl: './procesos-add.component.html',
  styleUrls: ['./procesos-add.component.css']
})
export class ProcesosAddComponent implements OnInit {
  constructor(
    private procesos: ProcesosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subprocesosService: SubprocesosService,
    private tareasService: TareasService
  ) { }
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = {
    id: null,
    centroTrabajoId: null,
    empresaId: null,
    esta_activo: true,
    nombre: null,
    n_orden: null,
    subProcesos: [
      {
        id: null,
        procesoId: null,
        esta_activo: true,
        nombre: null,
        detalles: null,
        n_orden: null,
        tareas: [
          {
            id: null,
            subprocesoId: null,
            esta_activo: true,
            nombre: null,
            n_orden: null,
            tipoTareaId: null,
            tipo: null,
          }
        ]
      }
    ],
    accion: 'I'

  };
  ngOnInit(): void { }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log("crear", this.modelo);

    let errorgrabado = false;
    let ActModelo =
    {
      nombre: this.modelo.nombre,
      n_orden: this.modelo.n_orden,
      centroTrabajoId: this.modelo.centroTrabajoId
    }
    console.log("crear_ActModelo", ActModelo);
    this.procesos.post(ActModelo).subscribe({
      next: (data) => {
        console.log("data proceso creado", data);
        let procesoId = data.data.id;

        this.modelo.subProcesos.forEach((subproceso: any) => {


          let ActSubProceso =
          {
            procesoId: procesoId,
            nombre: subproceso.nombre,
            detalles: subproceso.detalles ? subproceso.detalles : 'sin detalles',
            n_orden: subproceso.n_orden,
          }
          console.log("crear_ActSubProceso", ActSubProceso);
          if (ActSubProceso.nombre != null && ActSubProceso.nombre != undefined && ActSubProceso.nombre != '') {
                      this.subprocesosService.post(ActSubProceso).subscribe({
              next: (data) => {

                let subprocesoId = data.data.id;
                console.log("data subproceso creado", subprocesoId);
                subproceso.tareas.forEach((tarea: any) => {
                  let ActTarea =
                  {
                    nombre: tarea.nombre,
                    n_orden: tarea.n_orden,
                    tipo: 6,
                    subProcesoId: subprocesoId
                  }

                  this.tareasService.post(ActTarea).subscribe({
                    next: (data) => {

                    },
                    error: (err) => {
                      console.log(err.error.details[0].messages);
                      let mensajeError = err.error.details[0].messages;
                      let path = err.error.details[0].path;
                      let mensajeCompleto = 'Error al intentar crear el proceso, campo ' + path + ' ' + mensajeError;
                      errorgrabado = true;
                      this.snackbar.notify(
                        'danger',
                        mensajeCompleto
                      );
                    }

                  });

                });
              },
              error: (err) => {
                console.log(err.error.details[0].messages);
                let mensajeError = err.error.details[0].messages;
                let path = err.error.details[0].path;
                let mensajeCompleto = 'Error al intentar crear el proceso, campo ' + path + ' ' + mensajeError;
                errorgrabado = true;
                this.snackbar.notify(
                  'danger',
                  mensajeCompleto
                );
              }
            }
            );
          }
        }
        );

        if (!errorgrabado) {
          this.snackbar.notify('success', 'Registro actualizado exitosamente');
          this.router.navigate(['./..'], {
            relativeTo: this.activatedRoute,
          });
        }

      },
      error: (err) => {
        console.log(err.error.details[0].messages);
        let mensajeError = err.error.details[0].messages;
        let path = err.error.details[0].path;
        let mensajeCompleto = 'Error al intentar crear el proceso, campo ' + path + ' ' + mensajeError;
        errorgrabado = true;
        this.snackbar.notify(
          'danger',
          mensajeCompleto
        );
      }
    }
    );
  }
}

