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
import { SubMenuCotizacionAdminListService } from './sub-menu-cotizacion-admin-list.service';
@Component({
  selector: 'app-cotizacion-list',
  templateUrl: './cotizacion-list.component.html',
  styleUrls: ['./cotizacion-list.component.css']
})
export class CotizacionListComponent implements OnInit, OnDestroy {
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

    private readonly subMenuCotizacionAdminListService: SubMenuCotizacionAdminListService
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

    tiposolicitud: 'C',
    estadosolicitud: null,
    empresa: null,
  }


  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuCotizacionAdminListService.dataColumnCotizaciondadmin(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuCotizacionAdminListService.datasubMenucotizacionList(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {

    this.getdataEmpresa();

    this.mantenedorFormsolicitud = this.fb.group({

      estadosolicitud: [this.modeloSolicitudUser.estadosolicitud],
      idempresa: [this.modeloSolicitudUser.empresa],
      vmail: [null],
    });

    if (this.vmP.filtroliscotizacion.busquedaActiva) {
      this.modeloSolicitudUser.empresa = this.vmP.filtroliscotizacion.idempresa;

      this.modeloSolicitudUser.mailusuario = this.vmP.filtroliscotizacion.mailusuario;
      if (this.vmP.filtroliscotizacion.mailusuario != null && this.vmP.filtroliscotizacion.mailusuario != '') {
        this.modeloSolicitudUser.patchValue({ ['mailusuario']: this.vmP.filtroliscotizacion.mailusuario })


      }

      if (this.vmP.filtroliscotizacion.idempresa != null && this.vmP.filtroliscotizacion.idempresa != '') {
        this.mantenedorFormsolicitud.patchValue({ ['idempresa']: this.vmP.filtroliscotizacion.idempresa })


      }
      if (this.vmP.filtroliscotizacion.idestado != null && this.vmP.filtroliscotizacion.idestado != '') {
        this.mantenedorFormsolicitud.patchValue({ ['estadosolicitud']: this.vmP.filtroliscotizacion.idestado })


      }

      if (this.vmP.filtroliscotizacion.idusuario != null && this.vmP.filtroliscotizacion.idusuario != '') {
        this.mantenedorFormsolicitud.patchValue({ ['vmail']: this.vmP.filtroliscotizacion.mailusuario })


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

    if (elementoIndex.idestado == 3) {
      this.vmP.solicitudEditable = false;
    } else {
      this.vmP.solicitudEditable = true;
    }


    switch (e.event) {
      case 'edit':
        if (this.check_tipo == 1) {
          this.router.navigate(['AdmEdit'], {
            relativeTo: this.activatedRoute,
          });
        } else {
          this.router.navigate(['Edit'], {
            relativeTo: this.activatedRoute,
          });
        }

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
      idempresa = this.mantenedorFormsolicitud.get('idempresa')?.value ?? 0;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }


    // let body = {
    //   idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario),
    //   idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa??'0'),
    //   tiposolicitud: this.mantenedorFormsolicitud.get('tiposolicitud')?.value??'0',
    //   idestado: this.mantenedorFormsolicitud.get('estadosolicitud')?.value??0,
    // }


    this.vmP.filtroliscotizacion.idempresa = idempresa;
    // this.vmP.filtroliscotizacion.idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario;

    this.vmP.filtroliscotizacion.idestado = this.mantenedorFormsolicitud.get('estadosolicitud')?.value ?? 0,
      this.vmP.filtroliscotizacion.busquedaActiva = true;
    this.vmP.filtroliscotizacion.tiposolicitud = 'C';


    console.log('this.vmP.filtroliscotizacion', this.vmP.filtroliscotizacion)

    this.solicitudService.getconsultasolicitud(this.vmP.filtroliscotizacion).subscribe(
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
            this.vmP.filtroliscotizacion.idusuario = null;
            this.vmP.filtroliscotizacion.mailusuario = null;
            return;
          } else {
            this.vmP.filtroliscotizacion.idusuario = data[0].idusuario;
            this.vmP.filtroliscotizacion.mailusuario = data[0].mail;
            this.erromail = '';

          }
        } else {

          this.vmP.filtroliscotizacion.idusuario = null;
          this.mantenedorFormsolicitud.controls['vmail'].setErrors({ 'incorrect': true });
          this.mantenedorFormsolicitud.controls['vmail'].markAsTouched();
          this.vmP.filtroliscotizacion.idusuario = null;
          this.vmP.filtroliscotizacion.mailusuario = null;
          this.erromail = 'El e-mail no esta registrado.';
        }

      },
      (err) => {

      }
    );
  }


  add() {
    console.log(this.mantenedorFormsolicitud.value)

    this.router.navigate(['Add'], {
      relativeTo: this.activatedRoute
    });

  }

}
