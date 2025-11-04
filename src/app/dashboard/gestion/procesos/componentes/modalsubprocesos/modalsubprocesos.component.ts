import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { ModaltareasComponent } from '../modaltareas/modaltareas.component';

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
 

 
    
        // console.log("openmodalEdit", value);
    
        const isSmallScreen = window.innerWidth < 600;
        this.dialog.open(ModaltareasComponent, {
          
          data: {},
        }).afterClosed().subscribe((res) => {
          //  console.log("openmodalAdd_res", res);
    
          if (res == true) {
            
          }
        });
     

  }


}
