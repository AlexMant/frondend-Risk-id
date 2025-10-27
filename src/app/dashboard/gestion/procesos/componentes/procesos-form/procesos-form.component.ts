import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-procesos-form',
  templateUrl: './procesos-form.component.html',
  styleUrls: ['./procesos-form.component.css']
})
export class ProcesosFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 
                    nombre: [this.modelo.nombre, [Validators.required]], 
                    n_orden: [this.modelo.n_orden], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
                  
                    this.modelo.idusuario = this.mantenedorForm.get('nombre')?.value;
                    this.modelo.n_orden = this.mantenedorForm.get('n_orden')?.value
                    
  

    this.guardar.emit();
  }

}