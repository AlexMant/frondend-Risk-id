import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-observaciones-solicitud-form',
  templateUrl: './observaciones-solicitud-form.component.html',
  styleUrls: ['./observaciones-solicitud-form.component.css'],
})
export class ObservacionessolicitudFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
     
      vobservacion: [this.modelo.vobservacion, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
   
    this.modelo.vobservacion = this.mantenedorForm.get('vobservacion')?.value;

  this.mantenedorForm.reset();

    this.guardar.emit();
  }

}