import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-ubicaciones-form',
  templateUrl: './ubicaciones-form.component.html',
  styleUrls: ['./ubicaciones-form.component.css'],
})
export class UbicacionesFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
     private _vmP: VmParametrosService,
  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
      //  idgen_ubicacion: [this.modelo.idgen_ubicacion, [Validators.required]], 
      nombre: [this.modelo.nombre, [Validators.required]],
      // idcentrodetrabajo: [this.modelo.idcentrodetrabajo, [Validators.required]], 

    });
  }
  get vmP() {
    return this._vmP;
  }
  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    //  this.modelo.idgen_ubicacion = this.mantenedorForm.get('idgen_ubicacion')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    // this.modelo.idcentrodetrabajo = this.mantenedorForm.get('idcentrodetrabajo')?.value;



    this.guardar.emit();
  }

}