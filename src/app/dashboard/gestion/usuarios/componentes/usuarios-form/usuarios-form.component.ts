import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { TipousuarioService } from 'src/app/core/services/tipo-usuario.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , private snackbar: NotificationService
    , private readonly empresaService: EmpresaService
    , private readonly usuariosService: UsuariosService
    , private readonly tipousuarioService: TipousuarioService
    , public permisoService: PermisoService
  ) { }
  mantenedorForm!: FormGroup;
  editarform: boolean = true;
  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  // check_tipo = JSON.parse(localStorage.getItem("userInfo")).permiso[0].permisoId ?? 0;

  ngOnInit(): void {
    if (this.modelo.accion == 'U') {
      this.editarform = this.permisoService.tienePermisoCompuesto('ADMIN_USUARIOS', 'editar') ? true : false;
    }

    this.getdataEmpresa();
    this.getdatatipousuario();



    this.mantenedorForm = this.fb.group({
      email: [{ value: this.modelo.email, disabled: !this.editarform }, [Validators.required]],
      nombre: [{ value: this.modelo.nombre, disabled: !this.editarform }, [Validators.required]],
      telefono: [{ value: this.modelo.telefono, disabled: !this.editarform }],
      rut: [{ value: Fx.getRutTranforma2(this.modelo.rut), disabled: !this.editarform }, [Validators.required]],
      idtipo_usuario: [{ value: this.modelo.permisos[0].permisoId, disabled: !this.editarform }, [Validators.required]],
      idempresa: [{ value: this.modelo.permisos[0].empresaId, disabled: !this.editarform }, [Validators.required, Validators.min(1)]],
    });


  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {

    if (this.mantenedorForm.invalid) {
      return Object.values(this.mantenedorForm.controls).forEach(control => {
        control.markAsTouched();
      });

    }

    var empresaidtempral = null;
    // if (this.check_tipo == 1) {

    if (this.mantenedorForm.get('idempresa')?.value == null || this.mantenedorForm.get('idempresa')?.value == '' || this.mantenedorForm.get('idempresa')?.value == 0 || this.mantenedorForm.get('idempresa')?.value == undefined) {
      this.snackbar.notify('danger', 'Seleccione una empresa');
      return;
    }

    empresaidtempral = this.mantenedorForm.get('idempresa')?.value;

    // } else {
    //   empresaidtempral= JSON.parse(localStorage.getItem("userInfo")).idempresa;
    // }




    //  this.modelo.idusuario = this.mantenedorForm.get('idusuario')?.value;
    this.modelo.email = this.mantenedorForm.get('mail')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombreUsuario')?.value;
    this.modelo.empresaId = empresaidtempral;
    this.modelo.telefono = this.mantenedorForm.get('telefono')?.value;
    this.modelo.rut = this.mantenedorForm.get('rut')?.value;
    this.modelo.permisos = [
      {
        permisoId: this.mantenedorForm.get('idtipo_usuario')?.value,
        empresaId: empresaidtempral
      }
    ]





    this.guardar.emit();
  }

  datatipousuario: any[] = [];
  getdatatipousuario() {
    this.tipousuarioService.getall().subscribe({
      next: (data) => {
        console.log(">>>data tipousuario", data)
        this.datatipousuario = data.data
      },
      error: (err) => {
        this.datatipousuario = [];
      }
    });
  }

  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe({
      next: (data) => {
        console.log(">>>data empresa", data.data)
        this.dataempresas = data.data;
        this.selectedempresa = this.dataempresas;
      },
      error: (err) => {
        this.dataempresas = [];
      }
    });
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

  validaRut() {
    let rut = this.mantenedorForm.get('rut')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.mantenedorForm.patchValue({ ['rut']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.mantenedorForm.patchValue({ ['rut']: '' })
      this.mantenedorForm.controls['rut'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['rut'].markAsTouched();
    }

  }

  errorMail: any;
  validarmail() {
    let email = this.mantenedorForm.get('email')?.value;

    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorForm.controls['email'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['email'].markAsTouched();
          this.errorMail = 'El  E-mail no es valido.';

        } else {


          this.usuariosService.getallbyparametros('?email=' + email).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe({
            next: (data) => {
              console.log(">>>>>>data email", data)
              if (data.data != null && data.data.length > 0) {
                this.mantenedorForm.controls['email'].setErrors({ 'incorrect': true });
                this.mantenedorForm.controls['email'].markAsTouched();
                this.snackbar.notify('danger', 'El  E-mail ya se encuentra registrado en la base de datos.');
                this.errorMail = 'El   E-mail ya se encuentra registrado.';
              }

            },
            error: (err) => {
              console.log(">>>>>>err", err)


            }
          });


          // this.errorlogin = '';
        }
      }
    } else {
      this.mantenedorForm.controls['email'].setErrors({ 'incorrect': true });
      this.errorMail = 'Ingrese  E-mail';
      // this.errorlogin = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


}