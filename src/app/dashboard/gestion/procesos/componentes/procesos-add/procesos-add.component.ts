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
    empresaId: null,
    esta_activo: true,
    nombre: null,
    n_orden: null,
    subprocesos: [
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
            n_orden: null
          }
        ]
      }
    ]

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
      empresaId: this.modelo.empresaId
    }

    this.procesos.post(ActModelo).subscribe(
      (data) => {
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
          this.subprocesosService.post(ActSubProceso).subscribe(
            (data) => {

              let subprocesoId = data.data.id;
              console.log("data subproceso creado", subprocesoId);
              subproceso.tareas.forEach((tarea: any) => {
                let ActTarea =
                {
                  nombre: tarea.nombre,
                  n_orden: tarea.n_orden,
                  tipo: 1,
                  subProcesoId: Number(subprocesoId)
                }

                this.tareasService.post(ActTarea).subscribe(
                  (data) => {

                  },
                  (err) => {
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
                );

              });
            },
            (err) => {
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
          );
        }
        );

        if (!errorgrabado) {
          this.snackbar.notify('success', 'Registro actualizado exitosamente');
          this.router.navigate(['./..'], {
            relativeTo: this.activatedRoute,
          });
        }

      },
      (err) => {
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
    );
  }
}

