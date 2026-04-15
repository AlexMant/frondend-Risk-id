import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { ModalsubprocesosComponent } from '../modalsubprocesos/modalsubprocesos.component';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { PermisoService } from 'src/app/core/services/permiso.service';

@Component({
  selector: 'app-procesos-list',
  templateUrl: './procesos-list.component.html',
  styleUrls: ['./procesos-list.component.css']
})
export class ProcesosListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private proceso: ProcesosService,
    private empresaservice: EmpresaService,
    private centrosdetrabajosService: CentrosdetrabajosService,

    private readonly fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_MAPA_PROCESOS', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }


  }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: '#' },
    { name: 'centroTrabajoNombre', label: 'Centro de trabajo' },
    { name: 'nombre', label: 'Nombre Proceso', event: 'versubproceso', wrap: 0, },
    { name: 'n_orden', label: 'orden' },
    { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },

  ];

  tableDataMaintainer: Array<any>;

  mantenedorForm!: FormGroup;

  ngOnInit(): void {



    let centroTrabajoIds: any = JSON.parse(localStorage.getItem("userInfo"))?.centroTrabajoIds?.[0] ?? 0;

    this.mantenedorForm = this.fb.group({
      id_centro_de_trabajo_: [centroTrabajoIds],
    });


    this.getCargaEmpresa();
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

    // {
    //   icon: 'delete',
    //   label: 'Eliminar',
    //   event: 'delete',
    //   tooltip: '',
    //   condition: true,
    //   contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
    //   data: 'permisosDelete',
    // },
    {
      icon: 'remove_circle_outline',
      label: 'Desactivar',
      event: 'desac',
      tooltip: '',
      condition: true,
      contains: 'Inactiva',
      data: 'estado',
    },


    {
      icon: 'task_alt',
      label: 'Activar',
      event: 'activ',
      tooltip: '',
      condition: true,
      contains: 'Activa',
      data: 'estado',
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

      case 'versubproceso':


        this.openBottomSheet(elementoIndex);
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
              this.proceso.toggleActive(this.vmP.id).subscribe(
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
              message: '¿Seguro que desea dejar no vigente el proceso?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.proceso.toggleActive(this.vmP.id).subscribe(
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
              message: '¿Seguro que desea dejar vigente el proceso ?',
              btnText: 'Si, Seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.proceso.toggleActive(this.vmP.id).subscribe(
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
    let id_centro_de_trabajo_: any = this.mantenedorForm.get('id_centro_de_trabajo_')?.value ?? 0;

    // console.log("id_centro_de_trabajo_", id_centro_de_trabajo_);
    if (id_centro_de_trabajo_ == null || id_centro_de_trabajo_ == undefined || id_centro_de_trabajo_ == '' || id_centro_de_trabajo_ == 0) {
      id_centro_de_trabajo_ = undefined
    }

    let params = `?centroTrabajoId=${id_centro_de_trabajo_}`;


    this.empresaservice.getprocesosbyempresa(params).subscribe(
      (data) => {

        this.tableDataMaintainer = data.data.map((item: any, index: number) => {
          return {
            ...item,
            estadojson: JSON.stringify([{ descestado: item.esta_activo === true ? 'Activo' : 'Inactivo' }]),
            estado: item.esta_activo === true ? 'Activa' : 'Inactiva',
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_MAPA_PROCESOS', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_MAPA_PROCESOS', 'eliminar') ? 'SI' : 'NO',
          };
        });
        console.log(this.tableDataMaintainer);
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }



  selectedcentrodetrabajos: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedcentrodetrabajos = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataCentroDetrabajos) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  dataCentroDetrabajos: any[] = [];
  mostrarEmpresa: boolean = false;
  getCargaEmpresa() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let idusuario = 0;
    if (userInfo) {
      idusuario = userInfo.idusuario;
    }
    this.centrosdetrabajosService.getall().subscribe({
      next: (data) => {
        // console.log('dataempresas', data);
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);

        this.dataCentroDetrabajos = data_filtrada;
        this.selectedcentrodetrabajos = data_filtrada;
        if (data_filtrada.length > 1) {
          this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: 0 });
          this.mostrarEmpresa = true;
        } else {
          if (userInfo.check_admin == 1) {
            this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: 0 });
            this.mostrarEmpresa = true;
          } else {

            this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: this.dataCentroDetrabajos[0].id });
          }
        }




      },
      error: (err) => {
        this.dataCentroDetrabajos = [];
      }
   } );



  }

  openBottomSheet(data: any): void {
    //    this._bottomSheet.open(ayudapackComponent ,name:'aqui' );
    let bottonSheet =
      this._bottomSheet.open(ModalsubprocesosComponent, {

        data: data,
        disableClose: false,

      });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }


  add(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }



}

