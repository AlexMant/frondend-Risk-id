import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { DotacionService } from 'src/app/core/services/dotacion.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-dotacion-list',
  templateUrl: './dotacion-list.component.html',
  styleUrls: ['./dotacion-list.component.css'],
})
export class DotacionListComponent implements OnInit {
    @ViewChild('dotacionFormRef') dotacionFormComponent: any;

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private dotacionService: DotacionService
  ) { }

  get vmP() {
    return this._vmP;
  }

  modelo: any = {
    // iddotacion: null,
    trabajadorId: null,
    cargoPersonalId: null,
    centroTrabajoId: null,
    fechaInicio: null,
    fechaTermino: null,

  };

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'trabajadorNombre', label: 'Trabajador' },
    { name: 'cargoPersonalNombre', label: 'Cargo Personal' },
    // { name: 'centroTrabjoId', label: 'Centro de Trabajo' }, 
    { name: 'fechaInicio', label: 'Fecha Inicio' },
    { name: 'fechaTermino', label: 'Fecha Termino' },

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
              this.dotacionService.delete(this.vmP.id).subscribe(
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

  datatoacion:any;
  getData() {

    let idcentro = this.vmP.idfk;

    let paramas = `centroTrabajoId=${idcentro}`;
    this.dotacionService.getbyparams(paramas).subscribe({
      next: (data) => {
        console.log('data dotacion', data);
        this.tableDataMaintainer = data.data;
        this.datatoacion = data.data;
      },
      error: (err) => {
        this.tableDataMaintainer = [];
        this.datatoacion = [];
      }
    });
  }



  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./../centros-de-trabajo'], {
      relativeTo: this.activatedRoute,
    });
  }


   guardar() {

    
    let idtrabajador = this.modelo.trabajadorId;

    //buscar el id del trabajador en tableDataMaintainer y entrar error si existe
    let trabajadorExiste = this.datatoacion.filter((element) => {
      return element.trabajadorId === idtrabajador;
    })[0];

    if (trabajadorExiste) {
      this.snackbar.notify(
        'warning',
        'El trabajador ya se encuentra asaignado.'
      );
      return;
    }

    console.log('modelo a guardar', this.modelo);


    this.dotacionService.post(this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.getData();
        this.limpiarformularioenform();
        this.modelo = {  trabajadorId: null, cargoPersonalId: null, centroTrabajoId: null, fechaInicio: null, fechaTermino: null };

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


    limpiarformularioenform() {
    if (this.dotacionFormComponent && this.dotacionFormComponent.limpiarFormulario) {
      this.dotacionFormComponent.limpiarFormulario();
    }
  }
}