   import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-peligros-form',
  templateUrl: './peligros-form.component.html',
  styleUrls: ['./peligros-form.component.css'],
})
export class PeligrosFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 
                    nombre: [this.modelo.nombre, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 
                    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
                    
  

    this.guardar.emit();
  }

}