import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-descargar-iper',
  templateUrl: './descargar-iper.component.html',
  styleUrls: ['./descargar-iper.component.css']
})
export class DescargarIperComponent implements OnInit {

  constructor(

    private dialog: MatDialog,
        private snackbar: NotificationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _vmP: VmParametrosService,
        private proceso: ProcesosService,
        private empresaservice: EmpresaService,
        private readonly fb: FormBuilder,
        private _bottomSheet: MatBottomSheet,

  ) { }



    mantenedorForm!: FormGroup;

  ngOnInit(): void {

     console.log("tipoUsuario", JSON.parse(localStorage.getItem("userInfo")));
    let empresa: any = JSON.parse(localStorage.getItem("userInfo"))?.idempresa ?? 0;

     this.mantenedorForm = this.fb.group({
      id_empresa_: [empresa],


    });

    this.getCargaEmpresa();
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
        let data_filtrada = data.data.filter(emp => emp.esta_activo == true);  

        this.dataEmpresa = data_filtrada;
        this.selectedempresa = data_filtrada;
        if (data_filtrada.length > 1) {
          this.mantenedorForm.patchValue({ ['id_empresa_']: 0 });
          this.mostrarEmpresa = true;
        } else {
          if (userInfo.check_admin == 1) {
            this.mantenedorForm.patchValue({ ['id_empresa_']: 0 });
            this.mostrarEmpresa = true;
          } else {

            this.mantenedorForm.patchValue({ ['id_empresa_']: this.dataEmpresa[0].id_empresa_ });

          }
        }




      },
      (err) => {
        this.dataEmpresa = [];
      }
    );



  }


    getData() {
    let empresa: any = JSON.parse(localStorage.getItem("userInfo"))?.idempresa ?? 0;

    console.log("empresa", empresa);

    this.empresaservice.getprocesosbyempresa(empresa).subscribe(
      (data) => {
        console.log(data);
 
      },
      (err) => {
     
      }
    );
  }


}
