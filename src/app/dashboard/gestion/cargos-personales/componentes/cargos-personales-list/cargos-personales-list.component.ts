import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { CargosPersonalService } from 'src/app/core/services/cargos-personal.service';

import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-cargos-personales-list',
  templateUrl: './cargos-personales-list.component.html',
  styleUrls: ['./cargos-personales-list.component.css'],
})
export class CargospersonalesListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private cargospersonalesService: CargosPersonalService,
  ) { 

     if (_vmP.idfk == null || _vmP.idfk == undefined) {

      this.router.navigate(['../centros-de-trabajo'], {
        relativeTo: this.activatedRoute,
      });

      return;
    }

  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'nombre', label: 'Nombre Cargo Personal' },
    // { name: 'idcentrotrabajo', label: 'idcentrotrabajo' },

  ];

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    this.getData();
  }

  actionsMaintainer: Array<ActionInterface> = [
    // {
    //   icon: 'edit',
    //   label: 'Editar',
    //   event: 'edit',
    //   tooltip: '',
    // },

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
    },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id6 = elementoIndex.id;




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
              this.cargospersonalesService.delete(this.vmP.id6).subscribe(
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

    const params = 'centroTrabajoId=' + this.vmP.idfk;
    this.cargospersonalesService.getbyparams(params).subscribe(
      (data) => {
        this.tableDataMaintainer = data.data;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }


  add(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }


  modelo: any = {
    id: null,
    nombre: null,
    centroTrabajoId: this.vmP.idfk,

  };
  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./../centros-de-trabajo'], {
      relativeTo: this.activatedRoute,
    });
  }

  guardar() {
    console.log('guardar');
    this.cargospersonalesService.post(this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.getData();
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );
  }

}