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
 idgen_peligros: [this.modelo.idgen_peligros, [Validators.required]], 
                    nombre_peligros: [this.modelo.nombre_peligros, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.idgen_peligros = this.mantenedorForm.get('idgen_peligros')?.value;
                    this.modelo.nombre_peligros = this.mantenedorForm.get('nombre_peligros')?.value;
                    
  

    this.guardar.emit();
  }

}