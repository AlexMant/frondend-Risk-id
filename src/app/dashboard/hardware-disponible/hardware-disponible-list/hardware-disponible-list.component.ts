import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { ItemsService } from 'src/app/core/services/items.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { HardwareDisponibleDetComponent } from '../hardware-disponible-det/hardware-disponible-det.component';

@Component({
  selector: 'app-hardware-disponible-list',
  templateUrl: './hardware-disponible-list.component.html',
  styleUrls: ['./hardware-disponible-list.component.css']
})
export class HardwareDisponibleListComponent implements OnInit {
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
    
    { name: 'desitems', label: 'Ítems',    orientacion: 'L' , event: 'det',   wrap: 1},

    

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
                  this.abredetalle(elementoIndex);

        break;
        
        default:
          break;
    }
  }
  preloader: boolean = false;
  getData() {
    this.itemsService.getitemsdisponiblestop(1).subscribe(
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

  abredetalle(data: any) {
    let bottonSheet = this._bottomSheet.open(HardwareDisponibleDetComponent, {

      data: data,
      disableClose: false,
       autoFocus: false,

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // this.router.navigateByUrl('');
      if (result == true) {
        this.getData();
      }
    });
  }

  
}

