import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { ItemsService } from 'src/app/core/services/items.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private itemsService: ItemsService
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'iditems', label: '#' },
    { name: 'vimgitem', label: 'Imagen' , type: 'img' },
    // { name: 'vimgitem', label: '' },
    { name: 'desitems', label: 'Ítems',   },

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

    // {
    //   icon: 'delete',
    //   label: 'Eliminar',
    //   event: 'delete',
    //   tooltip: '',
    // },
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

    this.vmP.id = elementoIndex.iditems;




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
                titleventana: 'No Vigente',
                message: '¿Seguro que desea dejar no vigente el ítems?',
                btnText: 'Si, Seguro',
                btnTextSecondary: 'Cancelar',
              },
            })
            .afterClosed()
            .subscribe((res) => {
              if (res) {
                this.itemsService.desactivar(this.vmP.id).subscribe(
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
                      'Error al intentar dejar vigente el registro.'
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
                titleventana: 'Vigente',
                title: '¡Advertencia!',
                message: '¿Seguro que desea dejar vigente el ítems?',
                btnText: 'Si, Seguro',
                btnTextSecondary: 'Cancelar',
              },
            })
            .afterClosed()
            .subscribe((res) => {
              if (res) {
                this.itemsService.activar(this.vmP.id).subscribe(
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
                      'Error al intentar dejar vigente el registro.'
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
    this.itemsService.getall().subscribe(
      (data) => {
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            estadojson: JSON.stringify([{ cestado: element.cestado, descestado: element.cestado === 'V' ? 'Vigente' : 'No Vigente' }]),
          };
        }
        );
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
