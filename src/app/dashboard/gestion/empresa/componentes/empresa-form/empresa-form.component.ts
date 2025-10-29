import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
})
export class EmpresaFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private empresaService: EmpresaService
  ) { }
  mantenedorForm!: FormGroup;

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
      //  idempresa: [this.modelo.idempresa], 
      vnombreEmpresa: [this.modelo.vnombreEmpresa, [Validators.required]],
      vRut_empresa: [this.modelo.vRut_empresa, [Validators.required]],
      vMail: [this.modelo.vMail, [Validators.required]],
      cestado: [this.modelo.cestado, [Validators.required]],
      vNombre_Responsable: [this.modelo.vNombre_Responsable, [Validators.required]],
      vTelefono: [this.modelo.vTelefono, [Validators.required]],

    });
  }
  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    if(this.mantenedorForm.invalid){
      return Object.values(this.mantenedorForm.controls).forEach(control=>{
        control.markAsTouched();
      });
     
    }

    //  this.modelo.idempresa = this.mantenedorForm.get('idempresa')?.value;
    this.modelo.vnombreEmpresa = this.mantenedorForm.get('vnombreEmpresa')?.value;
    this.modelo.vRut_empresa = this.mantenedorForm.get('vRut_empresa')?.value;
    this.modelo.vMail = this.mantenedorForm.get('vMail')?.value;
    this.modelo.cestado = this.mantenedorForm.get('cestado')?.value;
    this.modelo.vNombre_Responsable = this.mantenedorForm.get('vNombre_Responsable')?.value;
    this.modelo.vTelefono = this.mantenedorForm.get('vTelefono')?.value;



    this.guardar.emit();
  }

  validaRut() {
    let rut = this.mantenedorForm.get('vRut_empresa')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.mantenedorForm.patchValue({ ['vRut_empresa']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.mantenedorForm.patchValue({ ['vRut_empresa']: '' })
      this.mantenedorForm.controls['vRut_empresa'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['vRut_empresa'].markAsTouched();
    }

  }

  errorMail: any;
  validarmail() {
    let email = this.mantenedorForm.get('vMail')?.value;

    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorForm.controls['vMail'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['vMail'].markAsTouched();
          this.errorMail = 'El  E-mail no es valido.';

        } else {


          this.empresaService.valmailempresa(email).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data) => {
              if (data == 2) {
                this.mantenedorForm.controls['vMail'].setErrors({ 'incorrect': true });
                this.mantenedorForm.controls['vMail'].markAsTouched();
                this.snackbar.notify('danger', 'El  E-mail ya se encuentra registrado en otra empresa.');
                this.errorMail = 'El   E-mail ya se encuentra registrado.';
              }

            },
            (err) => {
              console.log(">>>>>>err", err)


            }
          );


          // this.errorlogin = '';
        }
      }
    } else {
      this.mantenedorForm.controls['vMail'].setErrors({ 'incorrect': true });
      this.errorMail = 'Ingrese  E-mail';
      // this.errorlogin = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}