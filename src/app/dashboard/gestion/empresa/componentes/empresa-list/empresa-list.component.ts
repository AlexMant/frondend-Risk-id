import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { SubMenuListService } from '../sub-menu-list.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
})
export class EmpresaListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subMenuListService: SubMenuListService,
    private _vmP: VmParametrosService,
    private empresaService: EmpresaService,
    public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_EMPRESA', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }

  }

  get vmP() {
    return this._vmP;
  }


  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  tableDataMaintainer: Array<any>;
  ngOnInit(): void {

    this.getData();
  }

  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuListService.dataColumnsEmpresa(JSON.parse(localStorage.getItem("userInfo")).permiso ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuListService.datasubMenuEmpresa(JSON.parse(localStorage.getItem("userInfo")).permiso ?? 0);

  outputAction(e?: any) {
    if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;
    // this.vmP.idfk = elementoIndex.idempresa;
    this.vmP.des1 = elementoIndex.nombre;


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
              message: '¿Seguro que desea dejar no vigente la empresa?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.empresaService.toggleActive(this.vmP.id).subscribe(
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
                    'Error al intentar dejar vigente el registro.'
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
              message: '¿Seguro que desea dejar vigente la empresa?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.empresaService.toggleActive(this.vmP.id).subscribe(
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
      default:
        break;
    }
  }

  getData() {
    this.empresaService.getall().subscribe(
      (data) => {
        const dataempresa = data.data;
        console.log("dataempresa", dataempresa);
        this.tableDataMaintainer = dataempresa.map((element) => {
          return {
            ...element,
            // rut: Fx.setRutFormat(element.rut),
            // estado: element.estado == 'V' ? 'V' : 'N',


            estadojson: JSON.stringify([{ descestado: element.esta_activo === true ? 'Activa' : 'Inactiva' }]),
            estado: element.esta_activo === true ? 'Activa' : 'Inactiva',
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_EMPRESA', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_EMPRESA', 'eliminar') ? 'SI' : 'NO',
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
