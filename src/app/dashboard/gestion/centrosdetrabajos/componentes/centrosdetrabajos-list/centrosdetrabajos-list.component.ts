import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { ModalsubprocesosComponent } from '../../../procesos/componentes/modalsubprocesos/modalsubprocesos.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { PermisoService } from 'src/app/core/services/permiso.service';

@Component({
  selector: 'app-centrosdetrabajos-list',
  templateUrl: './centrosdetrabajos-list.component.html',
  styleUrls: ['./centrosdetrabajos-list.component.css']
})
export class CentrosdetrabajosListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private _bottomSheet: MatBottomSheet,
    private readonly fb: FormBuilder,
    private empresaservice: EmpresaService,
    public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_CENTROS_TRABAJO', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }


  }


  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'id', label: 'id' },
    { name: 'empresaNombre', label: 'Empresa' },
    { name: 'nombre', label: 'Centro de trabajo' },
    { name: 'n_orden', label: 'orden' },
    { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },

  ];

  tableDataMaintainer: Array<any>;

  mantenedorForm!: FormGroup;
  ngOnInit(): void {
    this.getCargaEmpresa();
    // console.log("tipoUsuario", JSON.parse(localStorage.getItem("userInfo")));
    let empresa: any = JSON.parse(localStorage.getItem("userInfo"))?.empresaId ?? 0;


    this.mantenedorForm = this.fb.group({
      id_empresa_: [empresa],


    });

    if (empresa && empresa > 0) {
      this.getData();
    }



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

    //  {
    //     icon: 'delete',
    //     label: 'Eliminar',
    //     event: 'delete',
    //     tooltip: '',
    //     condition: true,
    //     contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
    //     data: 'permisosDelete',
    //   },
    {
      icon: 'remove_circle_outline',
      label: 'Desactivar',
      event: 'activ',
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
    {
      icon: 'people',
      label: 'Cargos Personales',
      event: 'user',
      tooltip: '',
 
    },

    {
      icon: 'location_on',
      label: 'Ubicaciones',
      event: 'ubica',
      tooltip: '',

    },
    {
      icon: 'groups_2',
      label: 'Dotacion',
      event: 'dota',
      tooltip: '',

    },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;
    this.vmP.idfk = elementoIndex.id;
    this.vmP.idfk2 = elementoIndex.empresaId;
    this.vmP.des1 = elementoIndex.nombre;
    this.vmP.des2 = elementoIndex.empresaNombre;



    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'user':
        this.router.navigate(['../cargos-personales'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 'ubica':
        this.router.navigate(['../ubicaciones'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 'dota':
        this.router.navigate(['../dotacion'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 'activ':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            width: '320px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea cambiar el estado del registro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.centrosdetrabajosService.toggleActive(this.vmP.id).subscribe({
                next: (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro actualizado exitosamente'
                  );
                  this.getData();
                },
                error: (err) => {
                  console.log(err);
                  this.snackbar.notify(
                    'danger',
                    'Error al intentar actualizar el registro.'
                  );
                }
              });
            }
          });

        break;
        break;
      case 'delete':
      default:
        break;
    }
  }

  getData() {

    const empresaSeleccionada = this.mantenedorForm.get('id_empresa_')?.value;
    if (!empresaSeleccionada || empresaSeleccionada <= 0) {
      this.snackbar.notify('warning', 'Debe seleccionar una empresa para cargar los centros de trabajo.');
      this.tableDataMaintainer = [];
      return;
    }

    this.centrosdetrabajosService.getallbyempresa(empresaSeleccionada).subscribe(
      (data) => {
        this.tableDataMaintainer = data.data.map((item: any, index: number) => {
          return {
            ...item,
            estadojson: JSON.stringify([{ descestado: item.esta_activo === true ? 'Activo' : 'Inactivo' }]),
            estado: item.esta_activo === true ? 'Activa' : 'Inactiva',
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_CENTROS_TRABAJO', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_CENTROS_TRABAJO', 'eliminar') ? 'SI' : 'NO',
          };
        });
        console.log(this.tableDataMaintainer);
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  selectedempresa: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedempresa = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataEmpresa) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  dataEmpresa: any[] = [];
  mostrarEmpresa: boolean = false;
  getCargaEmpresa() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let idusuario = 0;
    if (userInfo) {
      idusuario = userInfo.idusuario;
    }
    this.empresaservice.getall().subscribe(
      (data) => {
        // console.log('dataempresas', data);
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);

        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          this.mostrarEmpresa = true;
          if (userInfo.empresaId != null) {
            const idEmpresa = Number(userInfo.empresaId);
            this.mantenedorForm.patchValue({ ['id_empresa_']: idEmpresa });

          }
        } else {

          const idEmpresa = Number(userInfo.empresaId ?? this.dataEmpresa[0].id);
          this.mantenedorForm.patchValue({ ['id_empresa_']: idEmpresa });
          this.mostrarEmpresa = false;
          this.getData();
          // if (userInfo.check_admin == 1) {
          //   // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          //   this.mostrarEmpresa = true;
          // } else {
          //   // Asegura que el id sea número
          //   const idEmpresa = Number(userInfo.empresaId?? this.dataEmpresa[0].id);
          //   this.mantenedorForm.patchValue({ ['empresaId']: idEmpresa });
          // }
        }



      },
      (err) => {
        this.dataEmpresa = [];
      }
    );



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
