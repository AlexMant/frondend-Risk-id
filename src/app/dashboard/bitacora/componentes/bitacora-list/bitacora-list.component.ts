import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { BitacoraService } from 'src/app/core/services/bitacora.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.css']
})
export class BitacoraListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private bitacoraService: BitacoraService
  ) { }

  get vmP() {
    return this._vmP;
  }

 

  modelo: any = {
    
    idusuario:parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario ?? 0),  
    dfechabitacora:null , 
    vobsbitacora:null , 
    idsolicictud:this.vmP.idfk2,  
    
};

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idbitacora', label: '#' },

    { name: 'nombreUsu', label: 'Usuario' },
    { name: 'dfechabitacora', label: 'Fecha', type: 'date', format: 'DD/MM/YYYY' },
    { name: 'vobsbitacora', label: 'Observación' },

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
              this.bitacoraService.delete(this.vmP.id).subscribe(
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
    this.bitacoraService.getid(this.vmP.idfk2 ).subscribe(
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
    this.bitacoraService.post(this.modelo).subscribe(
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
