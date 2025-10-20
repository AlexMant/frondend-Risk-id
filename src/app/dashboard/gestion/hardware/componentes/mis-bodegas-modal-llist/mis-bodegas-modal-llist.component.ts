import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { BodegasempresaService } from 'src/app/core/services/bodegas-empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-mis-bodegas-modal-llist',
  templateUrl: './mis-bodegas-modal-llist.component.html',
  styleUrls: ['./mis-bodegas-modal-llist.component.css']
})
export class MisBodegasModalLlistComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private bodegasempresaService: BodegasempresaService,
  ) { 
    if (_vmP.idfk3 == null || _vmP.idfk3 == undefined) {

      this.router.navigate(['./..'], {
        relativeTo: this.activatedRoute,
      });

      return;
    }
  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idbodegas_empresa', label: '#' },
    { name: 'vdesbodega', label: 'Nombre' },
    { name: 'vnombreencargado', label: 'Encargado' },
    { name: 'vdireccionbodega', label: 'Dirección' },
    { name: 'horarios', label: 'Horarios' },
    { name: 'vtelefonobodega', label: 'Teléfonno' },
    { name: 'vmailbodega', label: 'E-mail' },



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
              this.bodegasempresaService.delete(this.vmP.id).subscribe(
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
     
    this.bodegasempresaService.getbodegasbyempresa(this._vmP.idfk3).subscribe(
      (data) => {
        console.log(data);
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
}
