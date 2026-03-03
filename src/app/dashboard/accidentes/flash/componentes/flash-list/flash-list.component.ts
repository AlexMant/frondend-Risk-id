import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { FlashService } from 'src/app/core/services/flash.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-flash-list',
  templateUrl: './flash-list.component.html',
  styleUrls: ['./flash-list.component.css'],
})
export class FlashListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private flashService: FlashService

  ) { }




  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'codigo', label: 'Codigo' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción' }
    // { name: 'tipoFlashId', label: 'Tipo Flash' }, 
    // { name: 'fechaOcurrencia', label: 'Fecha Ocurrencia' }, 
    // { name: 'danoProtencialId', label: 'Dano Potencial' }, 
    // { name: 'danoRealId', label: 'Dano Real' }, 
    // { name: 'ubicacionId', label: 'Ubicacion' }, 
    // { name: 'lugarEspecifico', label: 'Lugar Especifico' }, 
    // { name: 'tareaId', label: 'Tarea' }, 
    // { name: 'medidaInmediata', label: 'Medida Inmediata' }, 

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
              this.flashService.delete(this.vmP.id).subscribe(
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
    this.flashService.getall().subscribe(
      (data) => {
        console.log('data', data);
        this.tableDataMaintainer = data.data.map((item) => {
          return {
            ...item,
            codigo: 'ACC-' + item.empresaId.toString().padStart(3, '0') + '-' + item.centroTrabajoId.toString().padStart(4, '0') + '-' + item.id.toString().padStart(5, '0'),
          };
        });
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }
}
