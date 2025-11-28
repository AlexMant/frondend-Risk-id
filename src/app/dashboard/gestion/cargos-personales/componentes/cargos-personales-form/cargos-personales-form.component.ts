   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargos-personales-form',
  templateUrl: './cargos-personales-form.component.html',
  styleUrls: ['./cargos-personales-form.component.css'],
})
export class CargospersonalesFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 idgen_cargos_personal: [this.modelo.idgen_cargos_personal, [Validators.required]], 
                    nombre_cargos_personal: [this.modelo.nombre_cargos_personal, [Validators.required]], 
                    idcentrotrabajo: [this.modelo.idcentrotrabajo, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.idgen_cargos_personal = this.mantenedorForm.get('idgen_cargos_personal')?.value;
                    this.modelo.nombre_cargos_personal = this.mantenedorForm.get('nombre_cargos_personal')?.value;
                    this.modelo.idcentrotrabajo = this.mantenedorForm.get('idcentrotrabajo')?.value;
                    
  

    this.guardar.emit();
  }

}