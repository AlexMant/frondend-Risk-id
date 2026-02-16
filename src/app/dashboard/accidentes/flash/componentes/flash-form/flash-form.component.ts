   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flash-form',
  templateUrl: './flash-form.component.html',
  styleUrls: ['./flash-form.component.css'],
})
export class FlashFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 flashId: [this.modelo.flashId, [Validators.required]], 
                    nombre: [this.modelo.nombre, [Validators.required]], 
                    descripcion: [this.modelo.descripcion, [Validators.required]], 
                    tipoFlashId: [this.modelo.tipoFlashId, [Validators.required]], 
                    fechaOcurrencia: [this.modelo.fechaOcurrencia, [Validators.required]], 
                    danoProtencialId: [this.modelo.danoProtencialId, [Validators.required]], 
                    danoRealId: [this.modelo.danoRealId, [Validators.required]], 
                    ubicacionId: [this.modelo.ubicacionId, [Validators.required]], 
                    lugarEspecifico: [this.modelo.lugarEspecifico, [Validators.required]], 
                    tareaId: [this.modelo.tareaId, [Validators.required]], 
                    medidaInmediata: [this.modelo.medidaInmediata, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.flashId = this.mantenedorForm.get('flashId')?.value;
                    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
                    this.modelo.descripcion = this.mantenedorForm.get('descripcion')?.value;
                    this.modelo.tipoFlashId = this.mantenedorForm.get('tipoFlashId')?.value;
                    this.modelo.fechaOcurrencia = this.mantenedorForm.get('fechaOcurrencia')?.value;
                    this.modelo.danoProtencialId = this.mantenedorForm.get('danoProtencialId')?.value;
                    this.modelo.danoRealId = this.mantenedorForm.get('danoRealId')?.value;
                    this.modelo.ubicacionId = this.mantenedorForm.get('ubicacionId')?.value;
                    this.modelo.lugarEspecifico = this.mantenedorForm.get('lugarEspecifico')?.value;
                    this.modelo.tareaId = this.mantenedorForm.get('tareaId')?.value;
                    this.modelo.medidaInmediata = this.mantenedorForm.get('medidaInmediata')?.value;
                    
  

    this.guardar.emit();
  }

}