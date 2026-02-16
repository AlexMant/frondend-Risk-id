import { Component, OnInit } from '@angular/core';
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
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private dotacionService: DotacionService
  ) {}

  get vmP() {
    return this._vmP;
  }

    modelo: any = { iddotacion:null , 
                    trabajadorId:null , 
                    cargopersonalId:null , 
                    centroTrabjoId:null , 
                    fechaInicio:null , 
                    fechaTermino:null , 
                    
};

  tableHeadMaintainer: Array<TableHeadInterface> = [
 { name: 'iddotacion', label: '#' }, 
                    { name: 'trabajadorId', label: 'Trabajador' }, 
                    { name: 'cargopersonalId', label: 'Cargo Personal' }, 
                    // { name: 'centroTrabjoId', label: 'Centro de Trabajo' }, 
                    { name: 'fechaInicio', label: 'Fecha Inicio' }, 
                    { name: 'fechaTermino', label: 'Fecha Termino' }, 
                    
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

this.vmP.id = elementoIndex.iddotacion;
                    

    

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

  getData() {
    this.dotacionService.getall().subscribe(
      (data) => {
        this.tableDataMaintainer = data;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }



    cancelar() {
    console.log('cancelar');
    this.router.navigate(['./../centros-de-trabajo'], {
      relativeTo: this.activatedRoute,
    });
  }


  guardar(){



    console.log('guardar');
  }
}