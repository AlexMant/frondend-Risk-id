import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { CargosPersonalService } from 'src/app/core/services/cargos-personal.service';
import { TrabajadoresService } from 'src/app/core/services/trabajadores.service';
@Component({
  selector: 'app-dotacion-form',
  templateUrl: './dotacion-form.component.html',
  styleUrls: ['./dotacion-form.component.css'],
})
export class DotacionFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , private _vmP: VmParametrosService
    , private cargopersonalServices: CargosPersonalService
    , private trabajadoresService: TrabajadoresService
  ) { }
  mantenedorForm!: FormGroup;

  get vmP() {
    return this._vmP;
  }
nombrecentrotrabajo: string = '';
  ngOnInit(): void {

    this.nombrecentrotrabajo = this._vmP.des1;
    this.getdatapersonalcargo();
    this.getCargaTrabajador();
    this.mantenedorForm = this.fb.group({

      trabajadorId: [this.modelo.trabajadorId, [Validators.required]],
      cargopersonalId: [this.modelo.cargoPersonalId, [Validators.required]],
      centroTrabjoId: [this.modelo.centroTrabajoId],
      fechaInicio: [this.modelo.fechaInicio, [Validators.required]],
      fechaTermino: [this.modelo.fechaTermino],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {

    const datePipe2 = new DatePipe('es');



    this.modelo.trabajadorId = this.mantenedorForm.get('trabajadorId')?.value;
    this.modelo.cargoPersonalId = this.mantenedorForm.get('cargopersonalId')?.value;
    this.modelo.centroTrabajoId = this.vmP.idfk;
    this.modelo.fechaInicio = datePipe2.transform(this.mantenedorForm.get('fechaInicio')?.value, 'yyyy-MM-dd');
    this.modelo.fechaTermino = datePipe2.transform(this.mantenedorForm.get('fechaTermino')?.value, 'yyyy-MM-dd');



    this.guardar.emit();
  }



  selectedTrabajador: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedTrabajador = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.datatrabajador) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  datatrabajador: any[] = [];

  getCargaTrabajador() {

    let params = '?empresaId=' + this._vmP.idfk2;
    this.trabajadoresService.getall().subscribe(
      (data) => {
        console.log('dataempresas', data);
        let data_filtrada = data.data;


        this.datatrabajador = data_filtrada;
        this.selectedTrabajador = data_filtrada;

      },
      (err) => {
        this.datatrabajador = [];
      }
    );
  }


  datapersonalcargo: any[] = [];
  getdatapersonalcargo() {

  let idcentro = this.vmP.idfk;

    let paramas = `centroTrabajoId=${idcentro}`;
    this.cargopersonalServices.getbyparams(paramas).subscribe({
      next: (data) => {
        console.log('data cargopersonal', data);
        this.datapersonalcargo = data.data.filter(
          (item: any) => item.id != 0
        );
      },
      error: () => {
        this.datapersonalcargo = [];
      }
  });

  }

   limpiarFormulario(): void {
      // Aquí puedes poner la lógica que desees ejecutar
      this.mantenedorForm.reset();
      
       
    }

}