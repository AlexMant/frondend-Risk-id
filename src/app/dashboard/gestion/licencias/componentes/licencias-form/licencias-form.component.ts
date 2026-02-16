   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-licencias-form',
  templateUrl: './licencias-form.component.html',
  styleUrls: ['./licencias-form.component.css'],
})
export class LicenciasFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 licenciaId: [this.modelo.licenciaId, [Validators.required]], 
                    trabajadorId: [this.modelo.trabajadorId, [Validators.required]], 
                    flashId: [this.modelo.flashId, [Validators.required]], 
                    fechaInicio: [this.modelo.fechaInicio, [Validators.required]], 
                    fechaTermino: [this.modelo.fechaTermino, [Validators.required]], 
                    tipolicenciaId: [this.modelo.tipolicenciaId, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.licenciaId = this.mantenedorForm.get('licenciaId')?.value;
                    this.modelo.trabajadorId = this.mantenedorForm.get('trabajadorId')?.value;
                    this.modelo.flashId = this.mantenedorForm.get('flashId')?.value;
                    this.modelo.fechaInicio = this.mantenedorForm.get('fechaInicio')?.value;
                    this.modelo.fechaTermino = this.mantenedorForm.get('fechaTermino')?.value;
                    this.modelo.tipolicenciaId = this.mantenedorForm.get('tipolicenciaId')?.value;
                    
  

    this.guardar.emit();
  }

}