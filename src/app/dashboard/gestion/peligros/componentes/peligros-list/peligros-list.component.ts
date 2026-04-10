import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { PeligrosService } from 'src/app/core/services/peligros.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { PermisoService } from 'src/app/core/services/permiso.service';
@Component({
  selector: 'app-peligros-list',
  templateUrl: './peligros-list.component.html',
  styleUrls: ['./peligros-list.component.css'],
})
export class PeligrosListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private peligrosService: PeligrosService,
    public permisoService: PermisoService
  ) {
    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_PELIGROS', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }

  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'nombre', label: 'Nombre Peligro' },

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

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
        condition: true,
      contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
      data: 'permisosDelete',
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
              this.peligrosService.delete(this.vmP.id).subscribe(
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
    this.peligrosService.getall().subscribe(
      (data) => {

        this.tableDataMaintainer = data.data.map((element) => {
          return {
            ...element,
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_PELIGROS', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_PELIGROS', 'eliminar') ? 'SI' : 'NO',
          };
        });
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