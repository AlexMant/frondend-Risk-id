import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { HardwareService } from 'src/app/core/services/hardware.service';
@Component({
  selector: 'app-hardware-disponible-det',
  templateUrl: './hardware-disponible-det.component.html',
  styleUrls: ['./hardware-disponible-det.component.css']
})
export class HardwareDisponibleDetComponent implements OnInit {

  constructor( 
     @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  , private _bottomSheetRef: MatBottomSheetRef
  ,private _vmP: VmParametrosService,
  private hardwareService: HardwareService
) { }

get vmP() {
  return this._vmP;
}

tableHeadMaintainer: Array<TableHeadInterface> = [
  // { name: 'idhardware', label: '#' }, 
  // { name: 'desitems', label: 'Ítems' }, 
  // { name: 'vnombreEmpresa', label: 'Empresa' }, 
  // { name: 'vdesbodega', label: 'Bodega' }, 
  { name: 'vmarca', label: 'Marca' }, 
  { name: 'vmodelo', label: 'Modelo' }, 
  // { name: 'vnumerodeparte', label: 'Número Parte' }, 
  // { name: 'vnumeroserie', label: 'Número de Serie' }, 
  // { name: 'dfechaRegistro_string', label: 'Fecha Ingreso'  , wrap: 0  }, 
  // { name: 'dfechamantencion_string', label: 'Fecha Mantención' , wrap: 0  }, 
  { name: 'vobservacion', label: 'Observación' , wrap: 0 }, 
  // { name: 'desestado', label: 'Estado' },
  // { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['cestado', 'descestado'], wrap: 1 }

  

];

tableDataMaintainer: Array<any>;
ngOnInit(): void {
  this.getData();
}

actionsMaintainer: Array<ActionInterface> = [
  
];

outputAction(e?: any) {
  //if (e.event) console.log(e);
  const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
    return index === e.index;
  })[0];

  this.vmP.id = elementoIndex.iditems;




  switch (e.event) {
    case 'det':
                // this.abredetalle(elementoIndex);

      break;
      
      default:
        break;
  }
}

getData() {
  console.log('this.data', this.data.iditems);
  this.hardwareService.gethardwaredisponiblestop(1,this.data.iditems).subscribe(
    (data) => {
      this.tableDataMaintainer = data.map((element) => {
        return {
          ...element,
          // estadojson: JSON.stringify([{ cestado: element.cestado, descestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente' }]),
        };
      }
      );
    },
    (err) => {
      this.tableDataMaintainer = [];
    }
  );
}

 
onCloseClick(): void {
  this._bottomSheetRef.dismiss();
}

}

 
