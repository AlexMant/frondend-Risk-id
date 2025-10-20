import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { BodegasService } from 'src/app/core/services/bodegas.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-bodegas-list',
  templateUrl: './bodegas-list.component.html',
  styleUrls: ['./bodegas-list.component.css'],
})
export class BodegasListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private bodegasService: BodegasService
  ) {}

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
 { name: 'idbodega', label: '#' }, 
                    { name: 'vdesbodega', label: 'Nombre' }, 
                    { name: 'vnombreencargado', label: 'Encargado' }, 
                    { name: 'vdireccionbodega', label: 'Dirección' }, 
                    { name: 'horarios', label: 'Horarios' }, 
                    { name: 'vtelefonobodega', label: 'Teléfonno' }, 
                    { name: 'vmailbodega', label: 'E-mail' }, 
                    // { name: 'vobservacionbodega', label: 'vobservacionbodega' }, 
                    // { name: 'vacapacidad', label: 'vacapacidad' }, 
                    // { name: 'descestado', label: 'Estado' }, 
                    { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['cestado', 'descestado'], wrap: 1 },
  ];

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    this.getData();
  }

  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'edit',
      label: 'Editar',
      event: 'edit',
      tooltip: '',
    },

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
    },
        {
          icon: 'remove_circle_outline',
          label: 'Desactivar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'N',
          data: 'cestado',
        },
        
    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'V',
          data: 'cestado',
        },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

this.vmP.id = elementoIndex.idbodega;
                    
    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });
        break;
        case 'desac':
          this.dialog
            .open(ConfirmModalComponent, {
              autoFocus: false,
              panelClass: 'custom-dialog-container',
            width: '400px',
              data: {
                type: 'warning',
                title: '¡Advertencia!',
                titleventana: 'Desactivar',
                message: '¿Seguro que desea desactivar la bodega?',
                btnText: 'Si, Seguro',
                btnTextSecondary: 'Cancelar',
              },
            })
            .afterClosed()
            .subscribe((res) => {
              if (res) {
                this.bodegasService.desactivar(this.vmP.id).subscribe(
                  (data) => {
                    this.snackbar.notify(
                      'success',
                      'Registro desactivado exitosamente'
                    );
                    this.getData();
                  },
                  (err) => {
                    console.log(err);
                    this.snackbar.notify(
                      'danger',
                      'Error al intentar desactivar el registro.'
                    );
                  }
                );
              }
            });
  
          break;
        case 'activ':
          this.dialog
            .open(ConfirmModalComponent, {
              autoFocus: false,
              panelClass: 'custom-dialog-container',
              width: '400px',
              data: {
                type: 'warning',
                titleventana: 'Activar',
                title: '¡Advertencia!',
                message: '¿Seguro que desea activar la bodega?',
                btnText: 'Si, Seguro',
                btnTextSecondary: 'Cancelar',
              },
            })
            .afterClosed()
            .subscribe((res) => {
              if (res) {
                this.bodegasService.activar(this.vmP.id).subscribe(
                  (data) => {
                    this.snackbar.notify(
                      'success',
                      'Registro activado exitosamente'
                    );
                    this.getData();
                  },
                  (err) => {
                    console.log(err);
                    this.snackbar.notify(
                      'danger',
                      'Error al intentar activar el registro.'
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
    this.bodegasService.getall().subscribe(
      (data) => {
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            descestado: element.cestado === 'V' ? 'Activo' : 'Inactivo',
            cestado: element.cestado == 'V' ? 'V' : 'N',
            estadojson: JSON.stringify([{ cestado: element.cestado, descestado: element.cestado === 'V' ? 'Activo' : 'Inactivo' }]),
          }
          });
          console.log(this.tableDataMaintainer);
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }
  
}