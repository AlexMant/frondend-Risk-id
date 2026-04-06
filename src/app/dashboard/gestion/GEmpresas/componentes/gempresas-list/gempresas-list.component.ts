import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { GEmpresasService } from 'src/app/core/services/gempresas.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-gempresas-list',
  templateUrl: './gempresas-list.component.html',
  styleUrls: ['./gempresas-list.component.css']
})
export class GEmpresasListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private gEmpresasService: GEmpresasService,
  public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_HOLDING', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }

  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'codigo', label: 'Codigo' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },


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
        condition: true,
        contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
        data: 'permisosEdit',
      },
      {
        icon: 'visibility',
        label: 'Ver',
        event: 'edit',
        tooltip: '',
        condition: true,
        contains: 'SI',   //si es NO deja eleiminar si es SI deja eliminar
        data: 'permisosEdit',
      },

      // {
      //   icon: 'delete',
      //   label: 'Eliminar',
      //   event: 'delete',
      //   tooltip: '',
      //   condition: true,
      //   contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
      //   data: 'permisosDelete',
      // },
  
        {
          icon: 'remove_circle_outline',
          label: 'Desactivar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'Inactivo',
          data: 'estado',
        },
        
    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'Activo',
          data: 'estado',
        },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;




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
              message: '¿Seguro que desea dejar Inactivo el holding?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.gEmpresasService.toggleActive(this.vmP.id).subscribe(
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
                    'Error al intentar dejar Activo el registro.'
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
              message: '¿Seguro que desea dejar vigente el holding?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.gEmpresasService.toggleActive(this.vmP.id).subscribe(
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
              this.gEmpresasService.delete(this.vmP.id).subscribe(
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
    this.gEmpresasService.getall().subscribe(
      (data) => {
        console.log("holding", data.data);
        const gdataempresa = data.data;
        this.tableDataMaintainer = gdataempresa.map((element) => {
          return {
            ...element,
            // rut: Fx.setRutFormat(element.rut),
            // estado: element.estado == 'V' ? 'V' : 'N',


            estadojson: JSON.stringify([{ descestado: element.esta_activo === true ? 'Activo' : 'Inactivo' }]),
            estado: element.esta_activo === true ? 'Activo' : 'Inactivo',
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_HOLDING', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_HOLDING', 'eliminar') ? 'SI' : 'NO',
          }
        });
        console.log("tableDataMaintainer", this.tableDataMaintainer);
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
