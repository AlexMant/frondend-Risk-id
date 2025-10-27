import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProcesosService } from 'src/app/core/services/procesos.service';

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
    ,private subprocesos: ProcesosService
  ) { }
 
  dataprcoesos: any;
 
  ngOnInit() {
     
    this.dataprcoesos = this.data;
    this.getDatasubprocesos(this.data.id);
     console.log(this.data)
  }


  
  getDatasubprocesos(id) {
 

    this.subprocesos.getbyprocesos(id).subscribe(
      (data) => {
        this.subprocesosList = data.data;
      },
      (err) => {
        this.subprocesosList = [];
      }
    );
  }

  openTareasModal(subproceso?: any) {
    console.log('Abrir modal de tareas para: ', subproceso);
    alert('Abrir modal de tareas para: ' + (subproceso?.nombre || 'proceso'));
  }


}
