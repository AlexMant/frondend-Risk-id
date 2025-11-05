
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

     this.getCargaEmpresa();


    this.mantenedorForm = this.fb.group({
      nombre: [this.modelo?.nombre || '', [Validators.required]],
      empresaId: [this.modelo?.empresaId || '', [Validators.required]],
      n_orden: [this.modelo?.n_orden || ''],
      subprocesos: this.fb.array([])
    });

    if (this.modelo?.subprocesos && Array.isArray(this.modelo.subprocesos)) {
      this.modelo.subprocesos.forEach((sub: any) => {
        const subForm = this.fb.group({
          nombre: [sub.nombre],
          tareas: this.fb.array([])
        });
        if (sub.tareas && Array.isArray(sub.tareas)) {
          sub.tareas.forEach((t: any) => {
            (subForm.get('tareas') as FormArray).push(this.fb.group({ nombre: [t.nombre] }));
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

    this.subprocesosFormArray.push(this.fb.group({ nombre: [''], tareas: this.fb.array([]) }));
        console.log('Agregar subproceso', this.subprocesosFormArray);
    // Forzar refresco de la vista si es necesario
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
    this.tareasFormArray(sub).push(this.fb.group({ nombre: [''] }));
    this.cdr.detectChanges();
  }

  eliminarTarea(sub: AbstractControl, idxTarea: number) {
    this.tareasFormArray(sub).removeAt(idxTarea);
  }

  btnCancelar() {
    this.cancelar.emit();
  }

  btnGuardar() {
    // El modelo final incluye subprocesos y tareas anidadas
    this.guardar.emit(this.mantenedorForm.value);
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
      if (a.desempresa.toLowerCase().indexOf(query) > -1) {
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
          this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          this.mostrarEmpresa = true;
        } else {
          if (userInfo.check_admin == 1) {
            this.mantenedorForm.patchValue({ ['empresaId']: 0 });
            this.mostrarEmpresa = true;
          } else {

            this.mantenedorForm.patchValue({ ['empresaId']: this.dataEmpresa[0].id_empresa_ });

          }
        }




      },
      (err) => {
        this.dataEmpresa = [];
      }
    );



  }

}