import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { DireccionesService } from 'src/app/core/services/direcciones.service';
import { SubMenuDireccionEmpresaService } from '../sub-menu-direcionempresa-list.service';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-direcciones-empresa-list',
  templateUrl: './direcciones-empresa-list.component.html',
  styleUrls: ['./direcciones-empresa-list.component.css']
})
export class DireccionesEmpresaListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private direccionesService: DireccionesService,
    private subMenubodegasEmpresaService: SubMenuDireccionEmpresaService,
    private _vmP: VmParametrosService,) {
    if (_vmP.idfk == null || _vmP.idfk == undefined) {

      this.router.navigate(['../empresa'], {
        relativeTo: this.activatedRoute,
      });

      return;
    }
  }

  get vmP() {
    return this._vmP;
  }

  modelo: any = {
    iddireccion: null,
    desdireccion: null,
    nro_casa: null,
    referencia: null,
    idusuario: null,
    id_comuna: null,
    cestado: null,
    longitud: null,
    latitud: null,
    vdepartamento: null,
    tipo_direccion: null,
    pais: null,
    region: null,
    provincia: null,
    comuna: null,
  };

  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenubodegasEmpresaService.dataColumnsDireccionEmpresa(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);
  actionsMaintainer: Array<ActionInterface> = this.subMenubodegasEmpresaService.datasubMenuDireccionEmpresa(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;

  titulo: string = 'Direcciones de la empresa';
  ngOnInit(): void {
    this.titulo = 'Direcciones de ' + this.vmP.des1;
    if (this.vmP.idfk != null && this.vmP.idfk != undefined) {

      this.getData();
    }
  }

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    // this.vmP.id = elementoIndex.ididreccion;




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
              this.direccionesService.deletedireccionempresa(elementoIndex.ididreccion).subscribe(
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
    this.direccionesService.getallbyempresa(this._vmP.idfk).subscribe(
      (data) => {
        console.log(data);
        this.tableDataMaintainer = data.map((element: any) => {
          return {
            ...element,
            destipodireccion: this.destipodireccion(element.tipo_direccion),
          };
        }
        );
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  destipodireccion(estado: any): string {
    switch (estado) {
      case 1:
        return 'Casa Matriz';
      case 2:
        return 'Sucursal';
      case 3:
        return 'Home Office';
      case 4:
        return 'Transitoria';
      case 5:
        return 'Terreno';
      default:
        return 'Sin definir';
    }
  }

  guardar() {
 

    let modelo3 = {
    

      comuna : this.modelo.comuna
      ,provincia : this.modelo.provincia
      ,region : this.modelo.region
      ,pais   : this.modelo.pais
       
      ,latitud  : this.modelo.latitud
      ,longitud  : this.modelo.longitud
       
      ,numero_casa   : this.modelo.nro_casa
      ,referencia    : this.modelo.referencia
      ,idempresa   : this.vmP.idfk
      ,desdireccion : this.modelo.desdireccion
      ,vdepartamento   : this.modelo.vdepartamento
      ,tipo_direccion  : this.modelo.tipo_direccion
    };
    this.direccionesService.post(modelo3).subscribe(
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
