import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bodegas-form',
  templateUrl: './bodegas-form.component.html',
  styleUrls: ['./bodegas-form.component.css'],
})
export class BodegasFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 
                    vdesbodega: [this.modelo.vdesbodega, [Validators.required]], 
                    vnombreencargado: [this.modelo.vnombreencargado, [Validators.required]], 
                    vdireccionbodega: [this.modelo.vdireccionbodega, [Validators.required]], 
                    // latitud: [this.modelo.latitud, [Validators.required]], 
                    // longitud: [this.modelo.longitud, [Validators.required]], 
                    horarios: [this.modelo.horarios, [Validators.required]], 
                    vtelefonobodega: [this.modelo.vtelefonobodega, [Validators.required]], 
                    vmailbodega: [this.modelo.vmailbodega, [Validators.required]], 
                    vobservacionbodega: [this.modelo.vobservacionbodega,], 
                    vacapacidad: [this.modelo.vacapacidad], 
                    cestado: [this.modelo.cestado, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 
    if(this.mantenedorForm.invalid){
      return Object.values(this.mantenedorForm.controls).forEach(control=>{
        control.markAsTouched();
      });
     
    }
    
                    this.modelo.vdesbodega = this.mantenedorForm.get('vdesbodega')?.value;
                    this.modelo.vnombreencargado = this.mantenedorForm.get('vnombreencargado')?.value;
                    this.modelo.vdireccionbodega = this.mantenedorForm.get('vdireccionbodega')?.value;
                    // this.modelo.latitud = this.mantenedorForm.get('latitud')?.value;
                    // this.modelo.longitud = this.mantenedorForm.get('longitud')?.value;
                    this.modelo.horarios = this.mantenedorForm.get('horarios')?.value;
                    this.modelo.vtelefonobodega = this.mantenedorForm.get('vtelefonobodega')?.value;
                    this.modelo.vmailbodega = this.mantenedorForm.get('vmailbodega')?.value;
                    this.modelo.vobservacionbodega = this.mantenedorForm.get('vobservacionbodega')?.value;
                    this.modelo.vacapacidad = this.mantenedorForm.get('vacapacidad')?.value;
                    this.modelo.cestado = this.mantenedorForm.get('cestado')?.value;
                    
  

    this.guardar.emit();
  }

  
  errorMail: any;
  validarmail() {
    let email = this.mantenedorForm.get('vmailbodega')?.value;

    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorForm.controls['vmailbodega'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['vmailbodega'].markAsTouched();
          this.errorMail = 'El   E-mail no es valido.';

        }  
      }
    } else {
      this.mantenedorForm.controls['vmailbodega'].setErrors({ 'incorrect': true });
      this.errorMail = 'Ingrese  E-mail';
      // this.errorlogin = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}