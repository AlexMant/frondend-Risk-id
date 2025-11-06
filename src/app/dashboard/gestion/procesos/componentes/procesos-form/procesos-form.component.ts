
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';

@Component({
  selector: 'app-procesos-form',
  templateUrl: './procesos-form.component.html',
  styleUrls: ['./procesos-form.component.css']
})
export class ProcesosFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  mantenedorForm!: FormGroup;
  // subprocesos: any[] = []; // Eliminado, ahora se usa FormArray

  constructor(
    private readonly fb: FormBuilder,
     private cdr: ChangeDetectorRef,
      private empresaservice: EmpresaService,
    ) {}


  ngOnInit(): void {
    // Si el modelo ya trae empresaId, deshabilitar el campo para que no sea editable
    if (this.modelo?.empresaId !== undefined && this.modelo?.empresaId !== null && this.modelo?.empresaId !== '') {
      setTimeout(() => {
        this.mantenedorForm.get('empresaId')?.disable();
      });
    }

     this.getCargaEmpresa();
console.log("modelo en form", this.modelo);

    this.mantenedorForm = this.fb.group({
      id: [this.modelo?.id || null],
      empresaId: [this.modelo?.empresaId !== undefined && this.modelo?.empresaId !== null && this.modelo?.empresaId !== '' ? Number(this.modelo.empresaId) : null, [Validators.required]],
      esta_activo: [this.modelo?.esta_activo !== undefined ? this.modelo.esta_activo : true],
      nombre: [this.modelo?.nombre || '', [Validators.required]],
      n_orden: [this.modelo?.n_orden !== undefined && this.modelo?.n_orden !== null && this.modelo?.n_orden !== '' ? Number(this.modelo.n_orden) : null],
      subprocesos: this.fb.array([])
    });

    if (this.modelo?.subProcesos && Array.isArray(this.modelo.subProcesos)) {
      this.modelo.subProcesos.forEach((sub: any) => {
        const subForm = this.fb.group({
          id: [sub.id || null],
          procesoId: [sub.procesoId || null],
          esta_activo: [sub.esta_activo !== undefined ? sub.esta_activo : true],
          nombre: [sub.nombre || ''],
          detalles: [sub.detalles || null],
          n_orden: [sub.n_orden !== undefined && sub.n_orden !== null && sub.n_orden !== '' ? Number(sub.n_orden) : null],
          tareas: this.fb.array([])
        });
        if (sub.tareas && Array.isArray(sub.tareas)) {
          sub.tareas.forEach((t: any) => {
            (subForm.get('tareas') as FormArray).push(this.fb.group({
              id: [t.id || null],
              subprocesoId: [t.subprocesoId || null],
              esta_activo: [t.esta_activo !== undefined ? t.esta_activo : true],
              nombre: [t.nombre || ''],
              n_orden: [t.n_orden !== undefined && t.n_orden !== null && t.n_orden !== '' ? Number(t.n_orden) : null]
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
      esta_activo: [true],
      nombre: [''],
      n_orden: [null]
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
  
      
      this.modelo.empresaId = this.mantenedorForm.get('empresaId')?.value !== undefined && this.mantenedorForm.get('empresaId')?.value !== null && this.mantenedorForm.get('empresaId')?.value !== '' ? Number(this.mantenedorForm.get('empresaId')?.value) : null,
      
         this.modelo.nombre= this.mantenedorForm.get('nombre')?.value,
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
          tipo:6,
          esta_activo: t.value.esta_activo
 
        }))
      }));
    
 
    console.log("modelo final", this.modelo);
     this.guardar.emit();
  }


  

  selectedempresa: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedempresa = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataEmpresa) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  dataEmpresa: any[] = [];
  mostrarEmpresa: boolean = false;
   getCargaEmpresa() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let idusuario = 0;
    if (userInfo) {
      idusuario = userInfo.idusuario;
    }
    this.empresaservice.getall().subscribe(
      (data) => {
        console.log('dataempresas', data);
        let data_filtrada = data.data;
        

        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          this.mostrarEmpresa = true;
        } else {
          if (userInfo.check_admin == 1) {
            // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
            this.mostrarEmpresa = true;
          } else {
            // Asegura que el id sea número
            const idEmpresa = Number(this.dataEmpresa[0].id_empresa_ ?? this.dataEmpresa[0].id);
            this.mantenedorForm.patchValue({ ['empresaId']: idEmpresa });
          }
        }




      },
      (err) => {
        this.dataEmpresa = [];
      }
    );



  }

}