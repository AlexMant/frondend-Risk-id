import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { SubMenuSolicitudAdminListService } from './sub-menu-solicitud-admin-list.service';
@Component({
  selector: 'app-solicitud-admin-list',
  templateUrl: './solicitud-admin-list.component.html',
  styleUrls: ['./solicitud-admin-list.component.css']
})
export class SolicitudAdminListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private solicitudService: SolicitudService,
    private readonly fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private usuariosService: UsuariosService,
    private readonly empresaService: EmpresaService,

    private readonly subMenuSolicitudAdminListService: SubMenuSolicitudAdminListService
  ) {




  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get vmP() {
    return this._vmP;
  }
  mantenedorFormsolicitud!: FormGroup;




  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloSolicitudUser: any = {
    idusuario: null,

    tiposolicitud: null,
    estadosolicitud: null,
    empresa: null,
  }


  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuSolicitudAdminListService.dataColumnSolicitudadmin(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuSolicitudAdminListService.datasubMenuSolicituduser(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {

    this.getdataEmpresa();

    this.mantenedorFormsolicitud = this.fb.group({

      tiposolicitud: [this.modeloSolicitudUser.tiposolicitud],
      estadosolicitud: [this.modeloSolicitudUser.estadosolicitud],
      idempresa: [this.modeloSolicitudUser.empresa],
      vmail: [null],
    });

    if (this.vmP.filtrosusuarioSolicitudadmin.busquedaActiva) {
      this.modeloSolicitudUser.empresa = this.vmP.filtrosusuarioSolicitudadmin.idempresa;
      this.modeloSolicitudUser.tiposolicitud = this.vmP.filtrosusuarioSolicitudadmin.tiposolicitud;
      this.modeloSolicitudUser.mailusuario = this.vmP.filtrosusuarioSolicitudadmin.mailusuario;
      if (this.vmP.filtrosusuarioSolicitudadmin.mailusuario != null && this.vmP.filtrosusuarioSolicitudadmin.mailusuario != '') {
        this.modeloSolicitudUser.patchValue({ ['mailusuario']: this.vmP.filtrosusuarioSolicitudadmin.mailusuario })


      }

      if (this.vmP.filtrosusuarioSolicitudadmin.idempresa != null && this.vmP.filtrosusuarioSolicitudadmin.idempresa != '') {
        this.mantenedorFormsolicitud.patchValue({ ['idempresa']: this.vmP.filtrosusuarioSolicitudadmin.idempresa })


      }
      if (this.vmP.filtrosusuarioSolicitudadmin.idestado != null && this.vmP.filtrosusuarioSolicitudadmin.idestado != '') {
        this.mantenedorFormsolicitud.patchValue({ ['estadosolicitud']: this.vmP.filtrosusuarioSolicitudadmin.idestado })


      }
      if (this.vmP.filtrosusuarioSolicitudadmin.tiposolicitud != null && this.vmP.filtrosusuarioSolicitudadmin.tiposolicitud != '') {
        this.mantenedorFormsolicitud.patchValue({ ['tiposolicitud']: this.vmP.filtrosusuarioSolicitudadmin.tiposolicitud })


      }
      if (this.vmP.filtrosusuarioSolicitudadmin.idusuario != null && this.vmP.filtrosusuarioSolicitudadmin.idusuario != '') {
        this.mantenedorFormsolicitud.patchValue({ ['vmail']: this.vmP.filtrosusuarioSolicitudadmin.mailusuario })


      }
    }

    this.getData();
  }



  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];
  
    this.vmP.id = elementoIndex.idsolicictud;
    this.vmP.idfk2 = elementoIndex.idsolicictud;
    this.vmP.idfk3 = elementoIndex.ctiposolictud;
    this.vmP.idfk5 = elementoIndex.idestado;

    this.vmP.des6 = elementoIndex.nombreUsuarioGenerador;
    this.vmP.des5 = elementoIndex.vobservacionit;

    if(elementoIndex.idestado == 3){
      this.vmP.solicitudEditable=false;
    }else{
      this.vmP.solicitudEditable=true;
    }

      
    switch (e.event) {
      case 'edit':
        this.router.navigate(['../edit'], {
          relativeTo: this.activatedRoute,
        });

        break;



      default:
        break;
    }
  }


  getData() {

    if (this.mantenedorFormsolicitud.invalid) {
      return Object.values(this.mantenedorFormsolicitud.controls).forEach(control => {
        control.markAsTouched();
      });

    }

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormsolicitud.get('idempresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }


    // let body = {
    //   idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario),
    //   idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa??'0'),
    //   tiposolicitud: this.mantenedorFormsolicitud.get('tiposolicitud')?.value??'0',
    //   idestado: this.mantenedorFormsolicitud.get('estadosolicitud')?.value??0,
    // }


    this.vmP.filtrosusuarioSolicitudadmin.idempresa = idempresa;
    // this.vmP.filtrosusuarioSolicitudadmin.idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario;
    this.vmP.filtrosusuarioSolicitudadmin.tiposolicitud = this.mantenedorFormsolicitud.get('tiposolicitud')?.value ?? '0',
      this.vmP.filtrosusuarioSolicitudadmin.idestado = this.mantenedorFormsolicitud.get('estadosolicitud')?.value ?? 0,
      this.vmP.filtrosusuarioSolicitudadmin.busquedaActiva = true;



    console.log('this.vmP.filtrosusuarioSolicitudadmin', this.vmP.filtrosusuarioSolicitudadmin)

    this.solicitudService.getconsultasolicitud(this.vmP.filtrosusuarioSolicitudadmin).subscribe(
      (data) => {
        console.log("getconsultasolicitud", data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,


            estadojson: JSON.stringify([{ color: this.colorEstado(element.idestado), descolumn: this.desestadoHardware(element.idestado) }]),
            nombreUsuarioGenerador: element.nombregenerador + ' ' + element.apellidogenerador,
            desiposolictud: this.destipo(element.ctiposolictud),

          };
        }
        );
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }
  destipo(tipo: any): string {
    switch (tipo) {
      case 'M':
        return 'Mantención';
      case 'N':
        return 'Nuevo Hardware';
      case 'C':
        return 'Cotizacion';
      case '':
        return 'Sin Información';
      default:
        return '';
    }
  }
  desestadoHardware(estado: any): string {
    switch (estado) {
      case 1:
        return 'Abierta';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Cerrada';
      case 0:
        return 'Sin Estado';
      default:
        return '';
    }
  }
  colorEstado(estado: any): string {
    switch (estado) {
      case 3:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';

      default:
        return '';
    }
  }


  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
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
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  erromail: any = '';
  validarmail() {
    let email = this.mantenedorFormsolicitud.get('vmail')?.value;
    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorFormsolicitud.controls['vmail'].setErrors({ 'incorrect': true });
          this.mantenedorFormsolicitud.controls['vmail'].markAsTouched();
          this.erromail = 'El e-mail no es valido.';

        } else {
          this.getDataUsuarios(email);
        }
      }
    } else {
      this.mantenedorFormsolicitud.controls['vmail'].setErrors({ 'incorrect': true });
      this.erromail = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  getDataUsuarios(mail: any) {
    console.log("mail", mail)
    this.usuariosService.getbymail(mail).subscribe(
      (data) => {
        console.log("mail", data)
        if (data.length > 0) {

          if (data[0].estado == 'N') {
            this.mantenedorFormsolicitud.controls['vmail'].setErrors({ 'incorrect': true });
            this.mantenedorFormsolicitud.controls['vmail'].markAsTouched();
            this.erromail = 'El usuario esta inactivo.';
            this.vmP.filtrosusuarioSolicitudadmin.idusuario = null;
            this.vmP.filtrosusuarioSolicitudadmin.mailusuario = null;
            return;
          } else {
            this.vmP.filtrosusuarioSolicitudadmin.idusuario = data[0].idusuario;
            this.vmP.filtrosusuarioSolicitudadmin.mailusuario = data[0].mail;
            this.erromail = '';

          }
        } else {

          this.vmP.filtrosusuarioSolicitudadmin.idusuario = null;
          this.mantenedorFormsolicitud.controls['vmail'].setErrors({ 'incorrect': true });
          this.mantenedorFormsolicitud.controls['vmail'].markAsTouched();
          this.vmP.filtrosusuarioSolicitudadmin.idusuario = null;
          this.vmP.filtrosusuarioSolicitudadmin.mailusuario = null;
          this.erromail = 'El e-mail no esta registrado.';
        }

      },
      (err) => {

      }
    );
  }

}
