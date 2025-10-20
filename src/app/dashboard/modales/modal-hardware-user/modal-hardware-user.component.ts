import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { AsignacionesHardwareService } from 'src/app/core/services/asignaciones-hardware.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-hardware-user',
  templateUrl: './modal-hardware-user.component.html',
  styleUrls: ['./modal-hardware-user.component.css']
})
export class ModalHardwareUserComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private asignacionesHardwareService: AsignacionesHardwareService
   , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) {
     
   }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'chek', label: '', chek: 'chek', wrap: 0,},
    { name: 'idhardware', label: '#' },
    { name: 'desitems', label: 'Ítems' },

    { name: 'vmarca', label: 'Marca' },
    { name: 'vmodelo', label: 'Modelo' },
    { name: 'vnumerodeparte', label: 'Número Parte' },
    { name: 'vnumeroserie', label: 'Número de Serie' },
    { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
    { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
    // { name: 'vobservacion', label: 'vobservacion' }, 
    // { name: 'desestado', label: 'Estado' },
    { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },


  ];

  tableDataMaintainer: Array<any>;

  idusuarioconsulta: any;
  
  ngOnInit(): void {
    console.log(this.data);
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
 




    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      
     
      case 'delete':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            width: '320px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea eliminar el registro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.asignacionesHardwareService.delete(this.vmP.id).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro eliminado exitosamente'
                  );
                  this.getData();
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
          });

        break;
      default:
        break;
    }
  }

  getData() {
     console.log(this.idusuarioconsulta);
    this.asignacionesHardwareService.getasignacionbyuser(this.idusuarioconsulta).subscribe(
      (data) => {
      
        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            chek: this.vmP.detallaherdsolicitud.some((element2) => element2.idhardware === element.idhardware),


            estadojson: JSON.stringify([{ color: this.colorEstado(element.cestado), descolumn: this.desestadoHardware(element.cestado) }]),
          
          };
        }
        ).filter((element) => {
          return element.cestado === 'A' 
        });
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }
  addresiduos() {
    const selectAll = this.tableDataMaintainer.filter((element) => element.chek == true);
    console.log(selectAll);
    this._vmP.detallaherdsolicitud = selectAll.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vserie: element.vnumeroserie,
        vmodelo: element.vmodelo,
        cantidad: 0,
        vobservacion: '',
        origen: 1,
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
