import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-danos-probable-form',
  templateUrl: './danos-probable-form.component.html',
  styleUrls: ['./danos-probable-form.component.css']
})
export class DanosProbableFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) {}
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
 idgen_danoprobable: [this.modelo.idgen_danoprobable, [Validators.required]], 
                    nombre_danoprobable: [this.modelo.nombre_danoprobable, [Validators.required]], 
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){
 this.modelo.idgen_danoprobable = this.mantenedorForm.get('idgen_danoprobable')?.value;
                    this.modelo.nombre_danoprobable = this.mantenedorForm.get('nombre_danoprobable')?.value;
                    
  

    this.guardar.emit();
  }

}