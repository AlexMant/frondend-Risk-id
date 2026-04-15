import { Component, OnInit } from '@angular/core';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { TrabajadoresService } from 'src/app/core/services/trabajadores.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-trabajadores-list',
  templateUrl: './trabajadores-list.component.html',
  styleUrls: ['./trabajadores-list.component.css'],
})

export class TrabajadoresListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private trabajadoresService: TrabajadoresService,
    private readonly fb: FormBuilder,
    private empresaservice: EmpresaService,
    public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }


  }


  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'trabajadorId', label: '#' },
    { name: 'empresaNombre', label: 'Empresa' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'rut', label: 'RUT' },
    { name: 'telefono', label: 'Teléfono' },
    { name: 'email', label: 'Email' },
    { name: 'direccion', label: 'Dirección' },


  ];

  tableDataMaintainer: Array<any>;
  mantenedorForm!: FormGroup;
  ngOnInit(): void {


    this.getCargaEmpresa();
    // console.log("tipoUsuario", JSON.parse(localStorage.getItem("userInfo")));
    let empresa: any = JSON.parse(localStorage.getItem("userInfo"))?.idempresa ?? 98;


    this.mantenedorForm = this.fb.group({
      id_empresa_: [empresa],


    });

    // if (empresa && empresa > 0) {
    //   this.getData();
    // }

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

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
      condition: true,
      contains: 'NO',   //si es NO deja eleiminar si es SI deja eliminar
      data: 'permisosDelete',
    },
    {
      icon: 'select_check_box',
      label: 'Asistencias',
      event: 'asis',
      tooltip: '',

    },
    {
      icon: 'check_box_outline_blank',
      label: 'Licencias',
      event: 'lic',
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
      case 'lic':
        this.router.navigate(['../licencias'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'asis':
        this.router.navigate(['../asistencias'], {
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
              this.trabajadoresService.delete(this.vmP.id).subscribe(
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

    const empresaSeleccionada = this.mantenedorForm.get('id_empresa_')?.value;
    if (!empresaSeleccionada || empresaSeleccionada <= 0) {
      this.snackbar.notify('warning', 'Debe seleccionar una empresa para cargar los centros de trabajo.');
      this.tableDataMaintainer = [];
      return;
    }

    let params = '?empresaId=' + empresaSeleccionada;
    console.log('params', params);

    this.trabajadoresService.getbyparams(params).subscribe({
      next: (data) => {

        this.tableDataMaintainer = data.data.map((item: any) => ({
          ...item,
          permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'editar') ? 'SI' : 'NO',
          permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'eliminar') ? 'SI' : 'NO',
          // permisosAsis: this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'ver_asistencias'),
          // permisosLic: this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'ver_licencias'),
        }));
        console.log('dataTrabajadores', this.tableDataMaintainer);
      },
      error: (err) => {
        this.tableDataMaintainer = [];
      }
    });
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
    this.empresaservice.getall().subscribe({
      next: (data) => {
        // console.log('dataempresas', data);
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);

        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          this.mantenedorForm.patchValue({ ['id_empresa_']: 0 });
          this.mostrarEmpresa = true;
        } else {
              this.mantenedorForm.patchValue({ ['id_empresa_']: this.dataEmpresa[0].id_empresa_ });
                this.mostrarEmpresa = true;
          // if (userInfo.check_admin == 1) {
          //   this.mantenedorForm.patchValue({ ['id_empresa_']: 0 });
          //   this.mostrarEmpresa = true;
          // } else {

          //   this.mantenedorForm.patchValue({ ['id_empresa_']: this.dataEmpresa[0].id_empresa_ });

          // }
        }




      },
      error: (err) => {
        this.dataEmpresa = [];
      }
    });



  }



  //  openBottomSheet(data: any): void {
  //     //    this._bottomSheet.open(ayudapackComponent ,name:'aqui' );
  //     let bottonSheet =
  //       this._bottomSheet.open(ModalsubprocesosComponent, {

  //         data: data,
  //         disableClose: false,

  //       });
  //     bottonSheet.afterDismissed().subscribe(result => {
  //       console.log('The dialog was closed', result);
  //       // this.animal = result;
  //     });
  //   }


  add(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }


}
