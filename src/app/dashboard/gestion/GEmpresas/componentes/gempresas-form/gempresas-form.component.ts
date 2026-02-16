import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';
@Component({
  selector: 'app-gempresas-form',
  templateUrl: './gempresas-form.component.html',
  styleUrls: ['./gempresas-form.component.css']
})
export class GEmpresasFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , private snackbar: NotificationService,
  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({

      nombre: [this.modelo.nombre, [Validators.required]],
      rut: [this.modelo.rut, [Validators.required]],

      observaciones: [this.modelo.observaciones],
      codigo: [this.modelo.codigo, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {

    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.rut = this.mantenedorForm.get('rut')?.value;

    this.modelo.observaciones = this.mantenedorForm.get('observaciones')?.value;
    this.modelo.codigo = this.mantenedorForm.get('codigo')?.value;



    this.guardar.emit();
  }




  validaRut() {
    let rut = this.mantenedorForm.get('rut')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.mantenedorForm.patchValue({ ['rut']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.mantenedorForm.patchValue({ ['rut']: '' })
      this.mantenedorForm.controls['rut'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['rut'].markAsTouched();
    }

  }



}