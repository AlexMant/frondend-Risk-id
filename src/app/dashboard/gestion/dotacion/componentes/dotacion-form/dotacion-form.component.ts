   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dotacion-form',
  templateUrl: './dotacion-form.component.html',
  styleUrls: ['./dotacion-form.component.css'],
})
export class DotacionFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 iddotacion: [this.modelo.iddotacion, [Validators.required]], 
                    trabajadorId: [this.modelo.trabajadorId, [Validators.required]], 
                    cargopersonalId: [this.modelo.cargopersonalId, [Validators.required]], 
                    centroTrabjoId: [this.modelo.centroTrabjoId, [Validators.required]], 
                    fechaInicio: [this.modelo.fechaInicio, [Validators.required]], 
                    fechaTermino: [this.modelo.fechaTermino, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.iddotacion = this.mantenedorForm.get('iddotacion')?.value;
                    this.modelo.trabajadorId = this.mantenedorForm.get('trabajadorId')?.value;
                    this.modelo.cargopersonalId = this.mantenedorForm.get('cargopersonalId')?.value;
                    this.modelo.centroTrabjoId = this.mantenedorForm.get('centroTrabjoId')?.value;
                    this.modelo.fechaInicio = this.mantenedorForm.get('fechaInicio')?.value;
                    this.modelo.fechaTermino = this.mantenedorForm.get('fechaTermino')?.value;
                    
  

    this.guardar.emit();
  }

}