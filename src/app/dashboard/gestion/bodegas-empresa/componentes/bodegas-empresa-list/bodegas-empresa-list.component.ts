import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { BodegasempresaService } from 'src/app/core/services/bodegas-empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { SubMenubodegasEmpresaService } from '../sub-menu-list.service';
@Component({
  selector: 'app-bodegas-empresa-list',
  templateUrl: './bodegas-empresa-list.component.html',
  styleUrls: ['./bodegas-empresa-list.component.css'],
})
export class BodegasEmpresaListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private bodegasempresaService: BodegasempresaService,
    private subMenubodegasEmpresaService: SubMenubodegasEmpresaService
  ) {
    if (_vmP.idfk == null || _vmP.idfk == undefined) {

      this.router.navigate(['../empresa'], {
        relativeTo: this.activatedRoute,
      });

      return;
    }
  }


  modelo: any = {
    idbodegas_empresa: 0,
    idbodega: null,
    idempresa: this.vmP.idfk,

  };


  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenubodegasEmpresaService.dataColumnsBodegaEmpresa(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);
  actionsMaintainer: Array<ActionInterface> = this.subMenubodegasEmpresaService.datasubMenuEmpresa(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;

  titulo: string = 'Bodegas de la empresa';
  ngOnInit(): void {
    this.titulo = 'Bodegas de ' + this.vmP.des1;
    if (this.vmP.idfk != null && this.vmP.idfk != undefined) {

      this.getData();
    }
  }
 
  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idbodegas_empresa;




    switch (e.event) {
      // case 'edit':
      //   this.router.navigate(['edit'], {
      //     relativeTo: this.activatedRoute,
      //   });

      //   break;
      case 'delete':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '400px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea eliminar el registro?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.bodegasempresaService.delete(this.vmP.id).subscribe(
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
    this.bodegasempresaService.getbodegasbyempresa(this._vmP.idfk).subscribe(
      (data) => {
        console.log(data);
        this.tableDataMaintainer = data;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  guardar() {
    let emp = this.modelo.idbodega;
    console.log(emp);
    
    let valexist = this.tableDataMaintainer.some((item: any) => item.idbodega == emp);
    console.log(valexist);
    if (valexist) {
      this.snackbar.notify(
        'danger',
        'Registro ya se encuentra asociado.'
      );
      return;
    }

    let modelo3 = {
      idbodegas_empresa: 0,
      idbodega: this.modelo.idbodega,
      idempresa: this.vmP.idfk,
    };
    this.bodegasempresaService.post(modelo3).subscribe(
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

  cancelar() {
    this.router.navigate(['../empresa'], {
      relativeTo: this.activatedRoute,
    });
  }
}
