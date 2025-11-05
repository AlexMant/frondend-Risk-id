import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';

@Component({
  selector: 'app-modaltareas',
  templateUrl: './modaltareas.component.html',
  styleUrls: ['./modaltareas.component.css']
})
export class ModaltareasComponent implements OnInit {
@Input() name: string;
  tareasList: any[] = [];
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
    ,public platform: Platform
    ,private subprocesos: SubprocesosService
  ) { }
 
  datasubprocesos: any;
 
  ngOnInit() {

    console.log('Datos recibidos en ModaltareasComponent:', this.data);
    this.datasubprocesos = this.data;
    this.getDatasubprocesos(this.data.id);
     console.log(this.data)
  }


  
  getDatasubprocesos(id) {
 

    this.subprocesos.gettareasbysubproceso(id).subscribe(
      (data) => {
        this.tareasList = data.data;
      },
      (err) => {
        this.tareasList = [];
      }
    );
  }

  openTareasModal(subproceso?: any) {
    console.log('Abrir modal de tareas para: ', subproceso);
    alert('Abrir modal de tareas para: ' + (subproceso?.nombre || 'proceso'));
  }


}
