import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
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
    private usuariosService: UsuariosService
    , public permisoService: PermisoService
  ) { }
  mantenedorForm!: FormGroup;
  editarform: boolean = true;
  ngOnInit(): void {
    if (this.modelo.accion == 'U') {
      this.editarform = false;
    }

    this.mantenedorForm = this.fb.group({

      empresaId: [{ value: this.modelo.empresaId, disabled: !this.editarform }, [Validators.required]],
      nombre: [{ value: this.modelo.nombre, disabled: !this.editarform }, [Validators.required]],
      n_orden: [{ value: this.modelo.n_orden, disabled: !this.editarform }],


    });
    this.getCargaEmpresa();

    if (this.modelo.empresaId != null) {
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
    console.log("userInfo", userInfo)
    let idusuario = 0;
    if (userInfo) {
      idusuario = userInfo.idusuario;
    }
    this.empresaservice.getall().subscribe({
      next: (data) => {
        console.log('dataempresas', data);
        let data_filtrada = data.data;


        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          this.mostrarEmpresa = true;
          if (userInfo.empresaId != null) {
            const idEmpresa = Number(userInfo.empresaId);
            this.mantenedorForm.patchValue({ ['empresaId']: idEmpresa });
            this.getcargaUsuarios(idEmpresa);
          }
        } else {

          const idEmpresa = Number(userInfo.empresaId ?? this.dataEmpresa[0].id);
          this.mantenedorForm.patchValue({ ['empresaId']: idEmpresa });
          this.mostrarEmpresa = false;
          this.getcargaUsuarios(idEmpresa);
          // if (userInfo.check_admin == 1) {
          //   // this.mantenedorForm.patchValue({ ['empresaId']: 0 });
          //   this.mostrarEmpresa = true;
          // } else {
          //   // Asegura que el id sea número
          //   const idEmpresa = Number(userInfo.empresaId?? this.dataEmpresa[0].id);
          //   this.mantenedorForm.patchValue({ ['empresaId']: idEmpresa });
          // }
        }
      },
      error: (err) => {
        this.dataEmpresa = [];
      }
    });
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
    this.usuariosService.getallbyparametros(params).subscribe({
      next: (data) => {
        console.log("data usuarios", data)


        this.tableDataUsuarios = data.data.filter((item: any) => item.estado === 'Activo').map((element) => {
          return {
            ...element,
            chek: false

          };
        }
        );
      },
      error: (err) => {
        this.tableDataUsuarios = [];
      }
    });
  }







}