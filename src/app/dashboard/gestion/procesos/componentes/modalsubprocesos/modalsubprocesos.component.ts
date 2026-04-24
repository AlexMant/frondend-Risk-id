import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { ModaltareasComponent } from '../modaltareas/modaltareas.component';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';

@Component({
  selector: 'app-modalsubprocesos',
  templateUrl: './modalsubprocesos.component.html',
  styleUrls: ['./modalsubprocesos.component.css']
})
export class ModalsubprocesosComponent implements OnInit {
  @Input() name: string;
  subprocesosList: any[] = [];
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
    , public platform: Platform
    , private dialog: MatDialog
    , private procesos: ProcesosService,
    private _bottomSheet: MatBottomSheet,
    private subprocesos: SubprocesosService
  ) { }

  dataprcoesos: any;

  ngOnInit() {

    this.dataprcoesos = this.data;
    this.getDatasubprocesos(this.data.id);
    console.log(this.data)
  }



  getDatasubprocesos(id) {
    this.procesos.getbyprocesossubytareas(id).subscribe({
      next: (data) => {
        console.log("data subprocesos", data);
       this.subprocesosList = (data.data.subProcesos || [])
        .filter((sub: any) => sub.esta_activo === true)
        .sort((a, b) => {
          const aOrden = (a.n_orden === 0) ? Number.MAX_SAFE_INTEGER : a.n_orden;
          const bOrden = (b.n_orden === 0) ? Number.MAX_SAFE_INTEGER : b.n_orden;
          return aOrden - bOrden;
        })
        .map(sub => ({
          ...sub,
          tareas: (sub.tareas || [])
            .filter((t: any) => t.esta_activo === true)
            .sort((a, b) => {
              const aOrden = (a.n_orden === 0) ? Number.MAX_SAFE_INTEGER : a.n_orden;
              const bOrden = (b.n_orden === 0) ? Number.MAX_SAFE_INTEGER : b.n_orden;
              return aOrden - bOrden;
            })
        }));

        console.log("subprocesosList", this.subprocesosList);

        // if (this.subprocesosList && Array.isArray(this.subprocesosList)) {
        //   this.subprocesosList.forEach(sub => {
        //     this.subprocesos.tree(sub.id).subscribe({

        //       next: (tareasData) => {
        //         console.log(`Tareas para subproceso ${sub.id}:`, tareasData);
        //         sub.tareas = tareasData.data.tareas.filter((t: any) => t.esta_activo === true);
        //       },
        //       error: (err) => {
        //         sub.tareas = [];
        //       }
        //     });
        //   });
        // }
      },
      error: (err) => {
        this.subprocesosList = [];
      }
    });
  }

 







  openTareasModal(subproceso?: any) {


    let bottonSheet =
      this._bottomSheet.open(ModaltareasComponent, {

        data: subproceso,
        disableClose: false,

      });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });




  }


  verIncidentes(tarea: any) {
    console.log('Ver incidentes de la tarea', tarea);
  }

}
