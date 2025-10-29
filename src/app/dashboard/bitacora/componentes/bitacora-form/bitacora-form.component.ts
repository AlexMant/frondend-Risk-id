import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.css']
})
export class BitacoraFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
     
      vobsbitacora: [this.modelo.vobsbitacora, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
   
    this.modelo.vobsbitacora = this.mantenedorForm.get('vobsbitacora')?.value;

  this.mantenedorForm.reset();

    this.guardar.emit();
  }

}