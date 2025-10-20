import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { ItemsService } from 'src/app/core/services/items.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-inventario-disponible-list',
  templateUrl: './inventario-disponible-list.component.html',
  styleUrls: ['./inventario-disponible-list.component.css']
})
export class InventarioDisponibleListComponent implements  OnInit {
  constructor(
    
    private _bottomSheet: MatBottomSheet,
    
    private _vmP: VmParametrosService,
    private itemsService: ItemsService
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    // { name: 'iditems', label: '#',   orientacion: 'L' },
    { name: 'vimgitem', label: '' , type: 'img',   orientacion: 'C' },
    
    // { name: 'desitems', label: 'Ítems',    orientacion: 'L' , event: 'det',   wrap: 1},
    { name: 'desitems', label: 'Ítems',    orientacion: 'L'  ,  wrap: 1},

    { name: 'totaldisponibles', label: 'Disponibles',    orientacion: 'L' ,   wrap: 1},
    { name: 'totalasignada', label: 'Asignados',    orientacion: 'L' ,    wrap: 1},
    { name: 'totalmantencion', label: 'Mantención',    orientacion: 'L' ,   wrap: 1},
    { name: 'totaleliminada', label: 'Reciclados',    orientacion: 'L' ,     wrap: 1},

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
  preloader: boolean = false;
  getData() {
    this.preloader = true;
    this.itemsService.getinventariodisponible(JSON.parse(localStorage.getItem("userInfo")).idempresa ?? 0).subscribe(
      (data) => {
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            // estadojson: JSON.stringify([{ cestado: element.cestado, descestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente' }]),
          };
        }
        );
        this.preloader = false;
      },
      (err) => {
        this.preloader = false;
        this.tableDataMaintainer = [];
      }
    );
  }

 

  
}

