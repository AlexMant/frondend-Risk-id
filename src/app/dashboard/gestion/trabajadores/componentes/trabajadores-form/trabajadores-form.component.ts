import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Fx } from 'src/app/utils/functions';

@Component({
  selector: 'app-trabajadores-form',
  templateUrl: './trabajadores-form.component.html',
  styleUrls: ['./trabajadores-form.component.css'],
})
export class TrabajadoresFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder
    , private empresaservice: EmpresaService
    , private snackbar: NotificationService
  ,public permisoService: PermisoService
  ) { }
  mantenedorForm!: FormGroup;
  editarform: boolean = true;

  ngOnInit(): void {
        if(this.modelo.accion == 'U'){
      this.editarform =  this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'editar') ? true : false;
    }


    this.getCargaEmpresa();
    // console.log("tipoUsuario", JSON.parse(localStorage.getItem("userInfo")));
    console.log("modelo", this.modelo);


    this.mantenedorForm = this.fb.group({
      id: [this.modelo.id],
      nombre: [{value: this.modelo.nombre, disabled: !this.editarform}, [Validators.required]],
      rut: [{value: this.modelo.rut, disabled: !this.editarform}, [Validators.required]],
      telefono: [{value: this.modelo.telefono, disabled: !this.editarform}],
      email: [{value: this.modelo.email, disabled: !this.editarform}],
      direccion: [{value: this.modelo.direccion, disabled: !this.editarform}],
      empresaId: [{value: this.modelo.empresaId, disabled: this.modelo.accion === 'U'}, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    //  this.modelo.trabajadorId = this.mantenedorForm.get('trabajadorId')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.rut = this.mantenedorForm.get('rut')?.value;
    this.modelo.telefono = this.mantenedorForm.get('telefono')?.value??'';
    this.modelo.email = this.mantenedorForm.get('email')?.value??'';
    this.modelo.direccion = this.mantenedorForm.get('direccion')?.value??'';
    this.modelo.empresaId = this.mantenedorForm.get('empresaId')?.value;



    this.guardar.emit();
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
        console.log('dataempresas', data);
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);

        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          this.mostrarEmpresa = true;
          if (this.modelo.empresaId == null) {
              this.mantenedorForm.patchValue({ ['empresaId']: 0 });
            } else {
              this.mantenedorForm.patchValue({ ['empresaId']: this.modelo.empresaId });
            }
        } else {
          if (userInfo.check_admin == 1) {

            this.mostrarEmpresa = true;
            if (this.modelo.empresaId == null) {
              this.mantenedorForm.patchValue({ ['empresaId']: 0 });
            } else {
              this.mantenedorForm.patchValue({ ['empresaId']: this.modelo.empresaId });
            }
          } else {

            if (this.modelo.empresaId == null) {
              this.mantenedorForm.patchValue({ ['empresaId']: this.dataEmpresa[0].id });
            } else {
              this.mantenedorForm.patchValue({ ['empresaId']: this.modelo.empresaId });
            }

          }
        }





      },
      (err) => {
        this.dataEmpresa = [];
      }
    );



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