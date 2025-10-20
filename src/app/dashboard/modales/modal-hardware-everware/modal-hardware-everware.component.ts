import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { HardwareService } from 'src/app/core/services/hardware.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-modal-hardware-everware',
  templateUrl: './modal-hardware-everware.component.html',
  styleUrls: ['./modal-hardware-everware.component.css']
})
export class ModalHardwareEverwareComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,

    private hardwareService: HardwareService
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) {

  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'chek', label: '', chek: 'chek', wrap: 0, },
    { name: 'idhardware', label: '#' },
    { name: 'desitems', label: 'Ítems' },

    { name: 'vmarca', label: 'Marca' },
    { name: 'vmodelo', label: 'Modelo' },
    // { name: 'vnumerodeparte', label: 'Número Parte' },
    // { name: 'vnumeroserie', label: 'Número de Serie' },
    // { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
    // { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
    { name: 'vobservacion', label: 'vobservacion' },
    // { name: 'desestado', label: 'Estado' },
    // { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },


  ];

  tableDataMaintainer: Array<any>;

  idusuarioconsulta: any;

  ngOnInit(): void {
    console.log(">>>>", this._vmP.detallaherdsolicitud);
    this.idusuarioconsulta = this.data;
    this.getData();
  }

  actionsMaintainer: Array<ActionInterface> = [

  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idhistorialhardware;


  }
  preloader: boolean = false;
  getData() {
    console.log(this.idusuarioconsulta);
    this.preloader = true;
    this.hardwareService.gethardwaredisponiblessolicitud(1).subscribe(
      (data) => {

        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            chek: this.vmP.detallaherdsolicitud.some((element2) => element2.idhardware === element.idhardware),


            // estadojson: JSON.stringify([{ color: this.colorEstado(element.cestado), descolumn: this.desestadoHardware(element.cestado) }]),

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



  addresiduos() {

    // const index = this._vmP.detallaherdsolicitud.findIndex((element: any) =>  element.origen === 2);
    // for (let i = 0; i < this._vmP.detallaherdsolicitud.length; i++) {
    //   if (this._vmP.detallaherdsolicitud[i].origen === 2) {
    //     this._vmP.detallaherdsolicitud.splice(i, 1);
    //     i--;
    //   }
    // }
    // this._vmP.detallaherdsolicitud.splice(index, 1);

    const select3 = this._vmP.detallaherdsolicitud.filter((element: any) => element.origen === 3);

    const selectAll = this.tableDataMaintainer.filter((element) => element.chek == true);

    console.log(selectAll);
    const selectAll2 = [];

    selectAll2.push(...select3.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vmodelo: element.vmodelo,
        cantidad: element.cantidad,
        vobservacion: element.vobservacion,
        origen: element.origen,
      };
    }
    ));

    selectAll2.push(...selectAll.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vmodelo: element.vmodelo,
        cantidad: 1,
        vobservacion: '',
        origen: 2,
      };
    }
    ));


    this.vmP.detallaherdsolicitud = []



    this._vmP.detallaherdsolicitud = selectAll2.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vmodelo: element.vmodelo,
        cantidad: element.cantidad,
        vobservacion: element.vobservacion,
        origen: element.origen,
      };
    }
    );
    this._bottomSheetRef.dismiss(true);
  }

  desestadoHardware(estado: string): string {
    switch (estado) {
      case 'A':
        return 'Asignado';
      case 'D':
        return 'Disponible';
      case 'M':
        return 'Mantención';
      case 'R':
        return 'Reciclado';
      default:
        return '';
    }
  }
  colorEstado(estado: string): string {
    switch (estado) {
      case 'A':
        return 'bg-secondary';
      case 'D':
        return 'bg-success';
      case 'M':
        return 'bg-warning';
      case 'R':
        return 'bg-danger';
      default:
        return '';
    }
  }


  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }

  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }


  selectData(): boolean {
    if (this.tableDataMaintainer != undefined) {
      return this.tableDataMaintainer.some((element) => element.chek == true) ?? false;
    } else {
      return false;
    }
  }
}
