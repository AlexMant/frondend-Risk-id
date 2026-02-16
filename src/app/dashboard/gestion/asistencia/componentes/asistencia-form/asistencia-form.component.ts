   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asistencia-form',
  templateUrl: './asistencia-form.component.html',
  styleUrls: ['./asistencia-form.component.css'],
})
export class AsistenciaFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 idasistencia: [this.modelo.idasistencia, [Validators.required]], 
                    trabajadorId: [this.modelo.trabajadorId, [Validators.required]], 
                    fechaAsistencia: [this.modelo.fechaAsistencia, [Validators.required]], 
                    minutosTrabajados: [this.modelo.minutosTrabajados, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.idasistencia = this.mantenedorForm.get('idasistencia')?.value;
                    this.modelo.trabajadorId = this.mantenedorForm.get('trabajadorId')?.value;
                    this.modelo.fechaAsistencia = this.mantenedorForm.get('fechaAsistencia')?.value;
                    this.modelo.minutosTrabajados = this.mantenedorForm.get('minutosTrabajados')?.value;
                    
  

    this.guardar.emit();
  }

}