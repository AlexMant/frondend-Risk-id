import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { SubMenuUsuarioListService } from '../sub-menu-usuario-list.service';
import { Fx } from 'src/app/utils/functions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private readonly fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private usuariosService: UsuariosService,
    private subMenuUsuarioListService: SubMenuUsuarioListService
    // , private readonly tipousuarioService: TipousuarioService
    , private readonly empresaService: EmpresaService
    , public permisoService: PermisoService
  ) {

    const permisover = this.permisoService.tienePermisoCompuesto('ADMIN_USUARIOS', 'ver');
    if (!permisover) {
      this.router.navigate(['/acceso-denegado']);
    }

  }

  get vmP() {
    return this._vmP;
  }
  mantenedorFormUsuario!: FormGroup;

  tableDataMaintainer: Array<any>;
  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloUsuario: any = {
    idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    empresa: null,
    // tipoUsuario: null,
    // mailusuario: null,
  }

  ngOnInit(): void {



    this.mantenedorFormUsuario = this.fb.group({
      // mailusuario: [this.modeloUsuario.mailusuario],
      // idtipo_usuario: [this.modeloUsuario.tipoUsuario],
      idempresa: [this.modeloUsuario.empresa]

    });

    this.getdataEmpresa();
    // this.getdatatipousuario();
    this.getData();
    // if (this.vmP.filtrosusuarioform.busquedaActiva) {
    //   this.modeloUsuario.empresa = this.vmP.filtrosusuarioform.empresa;
    //   this.modeloUsuario.tipoUsuario = this.vmP.filtrosusuarioform.tipoUsuario;
    //   this.modeloUsuario.mailusuario = this.vmP.filtrosusuarioform.mailusuario;
    //   if (this.vmP.filtrosusuarioform.mailusuario != null && this.vmP.filtrosusuarioform.mailusuario != '') {
    //     this.mantenedorFormUsuario.patchValue({ ['mailusuario']: this.vmP.filtrosusuarioform.mailusuario })


    //   }
    //   if (this.vmP.filtrosusuarioform.tipoUsuario != null && this.vmP.filtrosusuarioform.tipoUsuario != '') {
    //     this.mantenedorFormUsuario.patchValue({ ['idtipo_usuario']: this.vmP.filtrosusuarioform.tipoUsuario })



    //   }
    //   if (this.vmP.filtrosusuarioform.empresa != null && this.vmP.filtrosusuarioform.empresa != '') {
    //     this.mantenedorFormUsuario.patchValue({ ['idempresa']: this.vmP.filtrosusuarioform.empresa })


    //   }
    //   this.getData();
    //}


    // this.getData();
  }

  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuUsuarioListService.dataColumnsUsuario(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuUsuarioListService.datasubMenuUsuario(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);


  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;
    this._vmP.idfk = elementoIndex.id;
    this._vmP.idfk5 = elementoIndex.empresaId;
    this.vmP.des1 = elementoIndex.nombre;


    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'wasa':
        this.sendWhatsapp(elementoIndex.telefono);
        break;
      case 'addh':
        this.router.navigate(['../asignaciones-hardware'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 'dire':
        this.router.navigate(['../direccion-usuario'], {
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
              message: '¿Seguro que desea dejar no vigente al usuario?',
              btnText: 'Si, seguro',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.usuariosService.desactivar(this.vmP.id).subscribe(
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
              message: '¿Seguro que desea dejar vigente al usuario?',
              btnText: 'Activar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.usuariosService.activar(this.vmP.id).subscribe(
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

 
    // if (this.check_tipo == 1) {
    //   idempresa = this.mantenedorFormUsuario.get('idempresa')?.value;

    // } else {
    //   idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    // }


    var params = ''

    if (this.mantenedorFormUsuario.get('idempresa')?.value > 0) {
      params += '?empresaId=' + this.mantenedorFormUsuario.get('idempresa')?.value

    } else {
      params += ''
    }

    // let modelobuscar = {
    //   idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    //   empresa: idempresa,
    //   tipoUsuario: this.mantenedorFormUsuario.get('idtipo_usuario')?.value ?? 0,
    //   mailusuario: this.mantenedorFormUsuario.get('mailusuario')?.value ?? "",
    // }

    // this.vmP.filtrosusuarioform.empresa = idempresa;
    // this.vmP.filtrosusuarioform.idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario;
    // this.vmP.filtrosusuarioform.tipoUsuario = this.mantenedorFormUsuario.get('idtipo_usuario')?.value ?? 0;
    // this.vmP.filtrosusuarioform.mailusuario = this.mantenedorFormUsuario.get('mailusuario')?.value ?? "";
    // this.vmP.filtrosusuarioform.busquedaActiva = true;

    console.log("params", params)
    this.usuariosService.getallbyparametros(params).subscribe({
      next: (data) => {
        console.log("data usuarios", data)
        this.tableDataMaintainer = data.data.map((element) => {
          return {
            ...element,
            telefonocompleto: '+56' + element.telefono,


            formatrut: Fx.setRutFormat(element.rut),
            estadojson: JSON.stringify([{ descestado: element.estado }]),
            // estado: element.esta_activo === true ? 'Activa' : 'Inactiva',
            permisosEdit: this.permisoService.tienePermisoCompuesto('ADMIN_USUARIOS', 'editar') ? 'SI' : 'NO',
            permisosDelete: this.permisoService.tienePermisoCompuesto('ADMIN_USUARIOS', 'eliminar') ? 'SI' : 'NO',
          };
        }
        );
      },
      error: (err) => {
        this.tableDataMaintainer = [];
      }
    });
  }



  erromail: any = '';
  mailValido: boolean = false;
  validarmail() {
    let email = this.mantenedorFormUsuario.get('mailusuario')?.value;
    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorFormUsuario.controls['mailusuario'].setErrors({ 'incorrect': true });
          this.mantenedorFormUsuario.controls['mailusuario'].markAsTouched();
          this.erromail = 'El e-mail no es valido.';
          this.mailValido = false;
        } else {
          this.mailValido = true;
        }
      }
    } else {
      this.mantenedorFormUsuario.controls['mailusuario'].setErrors({ 'incorrect': true });
      this.erromail = 'El email no es valido.';
      this.mailValido = false;
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // datatipousuario: any[] = [];
  // getdatatipousuario() {
  //   this.tipousuarioService.getall().subscribe(
  //     (data) => {
  //       if (this.check_tipo == 1) {
  //         // console.log("data", data)
  //         this.datatipousuario = data
  //       } else {
  //         this.datatipousuario = data.filter((a: any) => a.idtipo_usuario != 1)
  //       }
  //     },
  //     (err) => {
  //       this.datatipousuario = [];
  //     }
  //   );
  // }


  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data.data
        console.log("data empresas", data)
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }


  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }


  sendWhatsapp(numero: any) {

    if (numero != null && numero != '' && numero != undefined && numero.length > 6) {
      let telefono = numero;
      if (telefono != null) {
        if (telefono.length > 0) {
          window.open('https://wa.me/56' + telefono, '_blank');
        }
      }
    } else {
      this.snackbar.notify('danger', 'El número de teléfono no es valido.');
    }

  }


}

