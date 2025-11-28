import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';
@Component({
  selector: 'app-gempresas-form',
  templateUrl: './gempresas-form.component.html',
  styleUrls: ['./gempresas-form.component.css']
})
export class GEmpresasFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    ,private snackbar: NotificationService,
  ) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 idgen_gempresas: [this.modelo.idgen_gempresas, [Validators.required]], 
                    nombres_gempresas: [this.modelo.nombres_gempresas, [Validators.required]], 
                    rut_gempresas: [this.modelo.rut_gempresas, [Validators.required]], 
                  
                    observaciones_gempresas: [this.modelo.observaciones_gempresas, [Validators.required]], 
                    codigo_gempresas: [this.modelo.codigo_gempresas, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.idgen_gempresas = this.mantenedorForm.get('idgen_gempresas')?.value;
                    this.modelo.nombres_gempresas = this.mantenedorForm.get('nombres_gempresas')?.value;
                    this.modelo.rut_gempresas = this.mantenedorForm.get('rut_gempresas')?.value;
                    this.modelo.estado_gempresas = this.mantenedorForm.get('estado_gempresas')?.value;
                    this.modelo.observaciones_gempresas = this.mantenedorForm.get('observaciones_gempresas')?.value;
                    this.modelo.codigo_gempresas = this.mantenedorForm.get('codigo_gempresas')?.value;
                    
  

    this.guardar.emit();
  }




    validaRut() {
      let rut = this.mantenedorForm.get('rut')?.value;
  
      let rut2 = Fx.getRutTranforma2(rut);
  
      if (rut2 != '') {
        this.mantenedorForm.patchValue({ ['rut']: rut2 })
  
      } else {
        this.snackbar.notify('danger', 'Rut no valido');
        this.mantenedorForm.patchValue({ ['rut_gempresas']: '' })
        this.mantenedorForm.controls['rut_gempresas'].setErrors({ 'incorrect': true });
        this.mantenedorForm.controls['rut_gempresas'].markAsTouched();
      }
  
    }


    
}