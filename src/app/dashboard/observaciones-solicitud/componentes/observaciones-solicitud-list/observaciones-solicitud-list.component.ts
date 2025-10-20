import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { ObservacionessolicitudService } from 'src/app/core/services/observaciones-solicitud.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-observaciones-solicitud-list',
  templateUrl: './observaciones-solicitud-list.component.html',
  styleUrls: ['./observaciones-solicitud-list.component.css'],
})
export class ObservacionesSolicitudListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private observacionessolicitudService: ObservacionessolicitudService
  ) { }

  get vmP() {
    return this._vmP;
  }

  modelo: any = {
    
    idsolicictud: this.vmP.idfk2,
    idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario ?? 0),
    dfechaobservacion: null,
    vobservacion: null,

  };
  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idobservacionsolicitud', label: '#' },

    { name: 'nombreUsu', label: 'Usuario' },
    { name: 'dfechaobservacion', label: 'Fecha', type: 'date', format: 'DD/MM/YYYY' },
    { name: 'vobservacion', label: 'Observación' },

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

    // {
    //   icon: 'delete',
    //   label: 'Eliminar',
    //   event: 'delete',
    //   tooltip: '',
    // },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idobservacionsolicitud;




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
              this.observacionessolicitudService.delete(this.vmP.id).subscribe(
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
    this.observacionessolicitudService.getid(this.vmP.idfk2 ).subscribe(
      (data) => {
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            nombreUsu: element.nombreUsuario + '' + element.primerapellido,
          };
        });
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }


  guardar() {
    console.log('guardar',this.modelo);
    this.observacionessolicitudService.post(this.modelo).subscribe(
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
