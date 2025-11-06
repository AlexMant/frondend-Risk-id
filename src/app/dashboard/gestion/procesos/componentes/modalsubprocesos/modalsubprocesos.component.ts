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
    ,public platform: Platform
    ,private dialog: MatDialog
    ,private procesos: ProcesosService,
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
    this.procesos.getbyprocesos(id).subscribe(
      (data) => {
        this.subprocesosList = data.data;
        // Para cada subproceso, cargar sus tareas
        if (this.subprocesosList && Array.isArray(this.subprocesosList)) {
          this.subprocesosList.forEach(sub => {
            this.subprocesos.gettareasbysubproceso(sub.id).subscribe(
              (tareasData) => {
                sub.tareas = tareasData.data;
              },
              (err) => {
                sub.tareas = [];
              }
            );
          });
        }
      },
      (err) => {
        this.subprocesosList = [];
      }
    );
  }

   tareasList: any[] = [];
  getdatatareas(id: number) {
    // Buscar el subproceso por id y cargar sus tareas
    const sub = this.subprocesosList.find(s => s.id === id);
    if (!sub) return;
    this.subprocesos.gettareasbysubproceso(id).subscribe(
      (data) => {
        sub.tareas = data.data;
      },
      (err) => {
        sub.tareas = [];
      }
    );
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
