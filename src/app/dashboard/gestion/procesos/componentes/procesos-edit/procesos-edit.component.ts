import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-procesos-edit',
  templateUrl: './procesos-edit.component.html',
  styleUrls: ['./procesos-edit.component.css']
})
export class ProcesosEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private procesos: ProcesosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subprocesosService: SubprocesosService,
    private tareasService: TareasService
  ) { }
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.procesos.getbyprocesossubytareas(this.vmP.id).subscribe(
      (data) => {
        console.log("data proceso", data);
        this.modelo = data.data;
      },
      (err) => {
        this.modelo = {};
      }
    );
  }
  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log("editar", this.modelo);

    let ActModelo =
    {
      nombre: this.modelo.nombre,
      n_orden: this.modelo.n_orden,
    }

    this.procesos.put(this.vmP.id, ActModelo).subscribe(
      (data) => {
        let procesoId = data.data.id;
        this.modelo.subProcesos.forEach((subproceso: any) => {


          if (subproceso.id == null || subproceso.id == 0) {

            let post_subproceso = {
              procesoId: procesoId,
              nombre: subproceso.nombre,
              detalles: subproceso.detalles?? 'Sin Detalles',
              n_orden: subproceso.n_orden,
            }

            this.subprocesosService.post(post_subproceso).subscribe(
              (data) => {

                let subprocesoId = data.data.id;
                console.log("data subproceso creado", subprocesoId);
                subproceso.tareas.forEach((tarea: any) => {
                  let ActTarea =
                  {
                    nombre: tarea.nombre,
                    n_orden: tarea.n_orden,
                    tipo: 6,
                    subProcesoId: subprocesoId,
                   
                  }

                  this.tareasService.post(ActTarea).subscribe(
                    (data) => {

                    },
                    (err) => {
                      console.log(err.error.details[0].messages);
                      let mensajeError = err.error.details[0].messages;
                      let path = err.error.details[0].path;
                      let mensajeCompleto = 'Error al intentar crear el proceso, campo ' + path + ' ' + mensajeError;

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

                this.snackbar.notify(
                  'danger',
                  mensajeCompleto
                );
              }
            );



          } else {


            let ActSubProceso =
            {
              id: subproceso.id,
              nombre: subproceso.nombre,
              detalles: subproceso.detalles?? 'Sin Detalles',
              n_orden: subproceso.n_orden,
              esta_activo: subproceso.esta_activo,
            }
            this.subprocesosService.put(subproceso.id, ActSubProceso).subscribe(
              (data) => {
                subproceso.tareas.forEach((tarea: any) => {


                  if (tarea.id == null || tarea.id == 0) {

                    let post_tarea =
                    {
                      nombre: tarea.nombre,
                      n_orden: tarea.n_orden,
                      tipo: 6,
                      subProcesoId: subproceso.id
                    }

                    this.tareasService.post(post_tarea).subscribe(
                      (data) => {

                      },
                      (err) => {
                        console.log(err.error.details[0].messages);
                        let mensajeError = err.error.details[0].messages;
                        let path = err.error.details[0].path;
                        let mensajeCompleto = 'Error al intentar crear el proceso, campo ' + path + ' ' + mensajeError;

                        this.snackbar.notify(
                          'danger',
                          mensajeCompleto
                        );
                      }
                    );

                  } else {


                    let put_tarea =
                    {
                      nombre: tarea.nombre,
                      n_orden: tarea.n_orden,
                      esta_activo: tarea.esta_activo,
                    }

                    this.tareasService.put(tarea.id, put_tarea).subscribe(
                      (data) => {

                      },
                      (err) => {
                        console.log(err);
                      }
                    );

                  }


                });
              },
              (err) => {
                console.log(err);
              }
            );

          } //fin else post subprocesos
        });




        this.snackbar.notify('success', 'Registro actualizado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });

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
}

