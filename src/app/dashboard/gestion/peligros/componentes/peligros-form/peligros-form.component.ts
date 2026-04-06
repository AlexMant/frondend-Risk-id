import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from 'src/app/core/services/permiso.service';

@Component({
  selector: 'app-peligros-form',
  templateUrl: './peligros-form.component.html',
  styleUrls: ['./peligros-form.component.css'],
})
export class PeligrosFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , public permisoService: PermisoService
  ) { }
  mantenedorForm!: FormGroup;
  editarform: boolean = true;

  ngOnInit(): void {

    if (this.modelo.accion == 'U') {
      this.editarform = this.permisoService.tienePermisoCompuesto('ADMIN_PELIGROS', 'editar') ? true : false;
    }

    this.mantenedorForm = this.fb.group({
      nombre: [{ value: this.modelo.nombre, disabled: !this.editarform }, [Validators.required]],
    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {

    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;



    this.guardar.emit();
  }

}