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

        this.modelo.subProcesos.forEach((subproceso: any) => {
          let ActSubProceso =
          {
            id: subproceso.id,
            nombre: subproceso.nombre,
            detalles: subproceso.detalles ? subproceso.detalles : 'sin detalles',
            n_orden: subproceso.n_orden,
          }
          this.subprocesosService.put(subproceso.id, ActSubProceso).subscribe(
            (data) => {
              subproceso.tareas.forEach((tarea: any) => {
                let ActTarea =
                {
                  nombre: tarea.nombre,
                  n_orden: tarea.n_orden,
                }

                this.tareasService.put(tarea.id, ActTarea).subscribe(
                  (data) => {

                  },
                  (err) => {
                    console.log(err);
                  }
                );

              });
            },
            (err) => {
              console.log(err);
            }
          );
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

