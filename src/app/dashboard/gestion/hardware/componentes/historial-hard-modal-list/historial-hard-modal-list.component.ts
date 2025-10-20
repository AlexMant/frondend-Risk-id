import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { HistorialhardwareService } from 'src/app/core/services/historial-hardware.service';

import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-historial-hard-modal-list',
  templateUrl: './historial-hard-modal-list.component.html',
  styleUrls: ['./historial-hard-modal-list.component.css']
})
export class HistorialHardModalListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private historialhardwareService: HistorialhardwareService
   , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) {
     
   }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idhistorialhardware', label: '#' },
    { name: 'nomusuario', label: 'Usuario' },
    { name: 'dfechahistorial_string', label: 'Fecha' },
    { name: 'vobservacion', label: 'Observación' },



  ];

  tableDataMaintainer: Array<any>;

  modeloguardar: any;
  
  ngOnInit(): void {
    this.modeloguardar = this.data;
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
              this.historialhardwareService.delete(this.vmP.id).subscribe(
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
     
    this.historialhardwareService.getIdHardware(this.modeloguardar.idhardware).subscribe(
      (data) => {
      
        this.tableDataMaintainer = data;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }

  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }

}
