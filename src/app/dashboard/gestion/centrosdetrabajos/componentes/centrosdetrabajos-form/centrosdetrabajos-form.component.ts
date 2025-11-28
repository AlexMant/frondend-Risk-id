import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';

@Component({
  selector: 'app-centrosdetrabajos-form',
  templateUrl: './centrosdetrabajos-form.component.html',
  styleUrls: ['./centrosdetrabajos-form.component.css']
})
export class CentrosdetrabajosFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
      private empresaservice: EmpresaService,

  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
      id: [this.modelo.id, [Validators.required]],
      empresaId: [this.modelo.empresaId, [Validators.required]],
      nombre: [this.modelo.nombre, [Validators.required]],
      n_orden: [this.modelo.n_orden, [Validators.required]],
    

    });
    this.getCargaEmpresa();
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    this.modelo.id = this.mantenedorForm.get('id')?.value;
    this.modelo.empresaId = this.mantenedorForm.get('empresaId')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.n_orden = this.mantenedorForm.get('n_orden')?.value;
    // this.modelo.esta_activo = this.mantenedorForm.get('esta_activo')?.value;



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