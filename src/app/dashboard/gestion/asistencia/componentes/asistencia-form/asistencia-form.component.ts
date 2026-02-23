import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-asistencia-form',
  templateUrl: './asistencia-form.component.html',
  styleUrls: ['./asistencia-form.component.css'],
})
export class AsistenciaFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: NotificationService,
     private _vmP: VmParametrosService,
  ) { }
    get vmP() {
    return this._vmP;
  }

  mantenedorForm!: FormGroup;
nombreTrabajador: string = '';
  ngOnInit(): void {
       this.nombreTrabajador = this._vmP.des1;
    this.mantenedorForm = this.fb.group({


      fechaInicio: [this.modelo.fechaInicio, [Validators.required]],
      horaInicio: [this.modelo.horaInicio, [Validators.required]],
      fechaTermino: [this.modelo.fechaTermino, [Validators.required]],
      horaTermino: [this.modelo.horaTermino, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {


    if (this.horastrabajadas <= 0) {

      this.snackbar.notify(
        'danger',
        'Debe ser Minimo una hora trabajada para poder registrarlo en el sistema.'
      );
      return;
    }
    const datePipe2 = new DatePipe('es');

    this.modelo.fechaInicio = datePipe2.transform(this.mantenedorForm.get('fechaInicio')?.value, 'yyyy-MM-dd');
    this.modelo.horaInicio = this.mantenedorForm.get('horaInicio')?.value;
    this.modelo.fechaTermino = datePipe2.transform(this.mantenedorForm.get('fechaTermino')?.value, 'yyyy-MM-dd');
    this.modelo.horaTermino = this.mantenedorForm.get('horaTermino')?.value;
    this.modelo.minutosTrabajados = this.minutosTrabajados;

    this.guardar.emit();
  }

  horastrabajadas: number = 0;
  minutosTrabajados: number = 0;
  calcularHorasTrabajadas() {
    const fechaInicio = this.mantenedorForm.get('fechaInicio')?.value;
    const horaInicio = this.mantenedorForm.get('horaInicio')?.value;
    const fechaTermino = this.mantenedorForm.get('fechaTermino')?.value;
    const horaTermino = this.mantenedorForm.get('horaTermino')?.value;

    if (!fechaInicio || !horaInicio || !fechaTermino || !horaTermino) {
      this.horastrabajadas = 0;
      this.minutosTrabajados = 0;
      return;
    }

    const datePipe = new DatePipe('es');
    const inicioStr = datePipe.transform(fechaInicio, 'yyyy-MM-dd') + 'T' + horaInicio;
    const terminoStr = datePipe.transform(fechaTermino, 'yyyy-MM-dd') + 'T' + horaTermino;

    const inicio = new Date(inicioStr);
    const termino = new Date(terminoStr);

    console.log('Inicio:', inicio);
    console.log('Término:', termino);
    console.log('Horas trabajadas:', inicio.getTime(), termino.getTime());

    if (isNaN(inicio.getTime()) || isNaN(termino.getTime())) {
      this.horastrabajadas = 0;
      this.minutosTrabajados = 0;
      return;
    }

    if (inicio >= termino) {
      this.horastrabajadas = 0;
      this.minutosTrabajados = 0;
      return;
    }

    const diffMs = termino.getTime() - inicio.getTime();
    const diffHoras = diffMs / (1000 * 60 * 60);
    this.horastrabajadas = diffHoras > 0 ? diffHoras : 0;
    this.minutosTrabajados =  diffMs / (1000 * 60) > 0 ? diffMs / (1000 * 60) : 0;
  }

  horasCompletas(): boolean {
    return (
      !!this.mantenedorForm.get('fechaInicio')?.value &&
      !!this.mantenedorForm.get('horaInicio')?.value &&
      !!this.mantenedorForm.get('fechaTermino')?.value &&
      !!this.mantenedorForm.get('horaTermino')?.value
    );
  }

   limpiarFormulario(): void {
      // Aquí puedes poner la lógica que desees ejecutar
      this.mantenedorForm.reset();
      
       
    }
}