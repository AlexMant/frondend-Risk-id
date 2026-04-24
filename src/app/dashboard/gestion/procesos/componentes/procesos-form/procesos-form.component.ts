// Métodos para castear AbstractControl a FormControl en el template


import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { TiposTareaService } from 'src/app/core/services/tipos-tarea.service';

@Component({
  selector: 'app-procesos-form',
  templateUrl: './procesos-form.component.html',
  styleUrls: ['./procesos-form.component.css']
})
export class ProcesosFormComponent implements OnInit {


  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  mantenedorForm!: FormGroup;
  // subprocesos: any[] = []; // Eliminado, ahora se usa FormArray

  constructor(
    private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private cdr: ChangeDetectorRef,
    private empresaservice: EmpresaService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private tiposTareaService: TiposTareaService,
    public permisoService: PermisoService,

  ) {

  }

  editarform: boolean = true;

  ngOnInit(): void {
    if (this.modelo.accion == 'U') {
      //this.editarform =   false;
      this.editarform = this.permisoService.tienePermisoCompuesto('ADMIN_MAPA_PROCESOS', 'editar') ? true : false;
    }

    // Si el modelo ya trae empresaId, deshabilitar el campo para que no sea editable
    // if (this.modelo?.centroTrabajoId !== undefined && this.modelo?.centroTrabajoId !== null && this.modelo?.centroTrabajoId !== '') {
    //   setTimeout(() => {
    //     this.mantenedorForm.get('id_centro_de_trabajo_')?.disable();
    //   });
    // }
    this.getdatatarea();
    this.getCargaEmpresa();
    console.log("modelo en form", this.modelo);

    this.mantenedorForm = this.fb.group({
      id: [this.modelo?.id || null],
      id_centro_de_trabajo_: [{ value: this.modelo.centroTrabajoId, disabled: this.modelo.accion == 'U' }, [Validators.required]],
      esta_activo: [{ value: this.modelo?.esta_activo !== undefined ? this.modelo.esta_activo : true, disabled: !this.editarform }],
      nombre: [{ value: this.modelo?.nombre || '', disabled: !this.editarform }, [Validators.required]],
      n_orden: [{ value: this.modelo?.n_orden !== undefined && this.modelo?.n_orden !== null && this.modelo?.n_orden !== '' ? Number(this.modelo.n_orden) : null, disabled: !this.editarform }],
      subprocesos: this.fb.array([])
    });

    if (this.modelo?.subProcesos && Array.isArray(this.modelo.subProcesos)) {
      this.modelo.subProcesos.forEach((sub: any) => {
        const subForm = this.fb.group({
          id: [sub.id || null],
          procesoId: [sub.procesoId || null],
          esta_activo: [{ value: sub.esta_activo !== undefined ? sub.esta_activo : true, disabled: !this.editarform }],
          nombre: [{ value: sub.nombre || '', disabled: !this.editarform }],
          detalles: [{ value: sub.detalles || null, disabled: !this.editarform }],
          n_orden: [{ value: sub.n_orden !== undefined && sub.n_orden !== null && sub.n_orden !== '' ? Number(sub.n_orden) : null, disabled: !this.editarform }],
          tareas: this.fb.array([])
        });
        if (sub.tareas && Array.isArray(sub.tareas)) {
          sub.tareas.forEach((t: any) => {
            (subForm.get('tareas') as FormArray).push(this.fb.group({
              id: [t.id || null],
              subprocesoId: [t.subprocesoId || null],
              esta_activo: [{ value: t.esta_activo !== undefined ? t.esta_activo : true, disabled: !this.editarform }],
              nombre: [{ value: t.nombre || '', disabled: !this.editarform }],
              n_orden: [{ value: t.n_orden !== undefined && t.n_orden !== null && t.n_orden !== '' ? Number(t.n_orden) : null, disabled: !this.editarform }],
              tipoTareaId: [{ value: t.tipoTareaId || null, disabled: !this.editarform }]
            }));
          });
        }
        this.subprocesosFormArray.push(subForm);
      });
    }
  }

  get subprocesosFormArray(): FormArray {
    return this.mantenedorForm.get('subprocesos') as FormArray;
  }

  get subprocesosDataSource() {
    // Devuelve una nueva referencia para que Angular Material Table detecte el cambio
    return this.subprocesosFormArray.controls.slice();
  }

  agregarSubproceso() {
    this.subprocesosFormArray.push(this.fb.group({
      id: [null],
      procesoId: [null],
      esta_activo: [true],
      nombre: [''],
      detalles: [null],
      n_orden: [null],
      tareas: this.fb.array([])
    }));
    this.cdr.detectChanges();
  }

  eliminarSubproceso(idx: number) {
    this.subprocesosFormArray.removeAt(idx);
  }


  tareasFormArray(sub: AbstractControl): FormArray {
    return (sub && sub.get('tareas')) ? (sub.get('tareas') as FormArray) : this.fb.array([]);
  }

  tareasDataSource(sub: AbstractControl) {
    const tareasArray = this.tareasFormArray(sub);
    return tareasArray && tareasArray.controls ? tareasArray.controls.slice() : [];
  }

  agregarTarea(sub: AbstractControl) {
    this.tareasFormArray(sub).push(this.fb.group({
      id: [null],
      subprocesoId: [null],
      esta_activo: [{ value: true, disabled: !this.editarform }],
      nombre: [{ value: '', disabled: !this.editarform }],
      n_orden: [{ value: null, disabled: !this.editarform }],
      tipoTareaId: [{ value: null, disabled: !this.editarform }]
    }));
    this.cdr.detectChanges();
  }

  eliminarTarea(sub: AbstractControl, idxTarea: number) {
    this.tareasFormArray(sub).removeAt(idxTarea);
  }

  btnCancelar() {
    this.cancelar.emit();
  }

  btnGuardar() {
    // El modelo final incluye solo los campos visibles y editables

    let tareasInvalidas = false;

    this.subprocesosDataSource.forEach((sub: AbstractControl) => {
      this.tareasDataSource(sub).forEach((t: AbstractControl) => {
        if (
          !t.value.nombre ||
          t.value.nombre.trim() === '' ||
          // t.value.n_orden === null ||
          // t.value.n_orden === undefined ||
          t.value.tipoTareaId === null ||
          t.value.tipoTareaId === undefined
        ) {
          tareasInvalidas = true;
        }
      });
    });

    if (tareasInvalidas) {
      this.snackbar.notify(
        'danger',
        'Todas las tareas deben tener Nombre y Tipo de Tarea.'
      );

      return;
    }

    this.modelo.centroTrabajoId = this.mantenedorForm.get('id_centro_de_trabajo_')?.value !== undefined && this.mantenedorForm.get('id_centro_de_trabajo_')?.value !== null && this.mantenedorForm.get('id_centro_de_trabajo_')?.value !== '' ? Number(this.mantenedorForm.get('id_centro_de_trabajo_')?.value) : null,

      this.modelo.nombre = this.mantenedorForm.get('nombre')?.value,
      this.modelo.n_orden = this.mantenedorForm.get('n_orden')?.value,
      this.modelo.subProcesos = this.subprocesosDataSource.map((sub: AbstractControl) => ({
        id: sub.value.id,
        nombre: sub.value.nombre,
        esta_activo: sub.value.esta_activo,
        detalles: sub.value.detalles,
        n_orden: sub.value.n_orden,
        tareas: this.tareasDataSource(sub).map((t: AbstractControl) => ({
          id: t.value.id ? t.value.id : 0,
          nombre: t.value.nombre,
          n_orden: t.value.n_orden,
          tipoTareaId: t.value.tipoTareaId,
          esta_activo: t.value.esta_activo

        }))
      }));


    console.log("modelo final", this.modelo);
    this.guardar.emit();
  }



  selectedcentrodetrabajos: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedcentrodetrabajos = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataCentroDetrabajos) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  dataCentroDetrabajos: any[] = [];
  mostrarEmpresa: boolean = false;
  getCargaEmpresa() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log("userInfo", userInfo);
    let idusuario = 0;
    if (userInfo) {
      idusuario = userInfo.idusuario;
    }
    this.centrosdetrabajosService.getall().subscribe(
      (data) => {
        console.log('centrosdetrabajo', data);
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);

        this.dataCentroDetrabajos = data_filtrada;
        this.selectedcentrodetrabajos = data_filtrada;
        // if (data_filtrada.length > 1) {
        //   // this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: 0 });
        //   this.mostrarEmpresa = true;
        // } else {
        //   if (userInfo.permiso[0].permisoId == 1 || userInfo.permiso[0].permisoId == 2) {
        //     // this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: 0 });
        //     this.mostrarEmpresa = true;
        //   } else {

        //     // this.mantenedorForm.patchValue({ ['id_centro_de_trabajo_']: this.dataCentroDetrabajos[0].id });
        //   }
        // }




      },
      (err) => {
        this.dataCentroDetrabajos = [];
      }
    );



  }




  datatareas: any[] = [];
  getdatatarea() {
    this.tiposTareaService.getall().subscribe(
      (data) => {
        console.log(data);
        this.datatareas = data.data;
      },
      (err) => {
        this.datatareas = [];
      }
    );
  }

  asFormControl(ctrl: AbstractControl | null) {
    return ctrl as import('@angular/forms').FormControl;
  }


}