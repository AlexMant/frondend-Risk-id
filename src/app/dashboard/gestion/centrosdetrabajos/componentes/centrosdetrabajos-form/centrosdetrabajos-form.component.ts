import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

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
    private usuariosService: UsuariosService,
  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({
    
      empresaId: [this.modelo.empresaId, [Validators.required]],
      nombre: [this.modelo.nombre, [Validators.required]],
      n_orden: [this.modelo.n_orden],


    });
    this.getCargaEmpresa();

    if(this.modelo.empresaId!=null){
      this.getcargaUsuarios(this.modelo.empresaId);
    }

    
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
  
    this.modelo.empresaId = this.mantenedorForm.get('empresaId')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.n_orden = this.mantenedorForm.get('n_orden')?.value;
    // this.modelo.esta_activo = this.mantenedorForm.get('esta_activo')?.value;
    this.modelo.usuarioscentrodetrabajo = this.tableDataUsuarios.filter((element) => element.chek === true).map((element) => element.id);

    console.log("modelo a guardar", this.modelo);

    // this.guardar.emit();
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

  tableHeadUsuarios: Array<TableHeadInterface> = [
     { name: 'chek', label: '', chek: 'chek', wrap: 0 },
    // { name: 'id', label: '#' },

    { name: 'nombre', label: 'Usuario' },
    { name: 'email', label: 'E-mail' },
    

  ];

  tableDataUsuarios: Array<any>;


  getcargaUsuarios(empresaId: number) {
 
    // console.log("filtros", this.vmP.filtrosusuarioform)
    const params = '?empresaId=' + empresaId;
    this.usuariosService.getallbyparametros(params).subscribe(
      (data) => {
        console.log("data usuarios", data)
 

        this.tableDataUsuarios = data.data.filter((item:any) => item.estado === 'Activo').map((element) => {
          return {
            ...element,
            chek: false
            
          };
        }
        );
      },
      (err) => {
        this.tableDataUsuarios = [];
      }
    );
  }







}