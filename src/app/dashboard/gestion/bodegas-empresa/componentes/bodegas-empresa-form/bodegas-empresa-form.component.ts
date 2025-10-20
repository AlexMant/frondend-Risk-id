import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodegasService } from 'src/app/core/services/bodegas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-bodegas-empresa-form',
  templateUrl: './bodegas-empresa-form.component.html',
  styleUrls: ['./bodegas-empresa-form.component.css'],
})
export class BodegasEmpresaFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private _vmP: VmParametrosService
    , private bodegasService: BodegasService
  ) { }
  mantenedorForm!: FormGroup;

  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.cargaBodega();
    this.mantenedorForm = this.fb.group({

      idbodega: [this.modelo.idbodega, [Validators.required]],
      idempresa: [this.vmP.idfk, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  
  }
  btnGuardar() {
 
    this.modelo.idbodega = this.mantenedorForm.get('idbodega')?.value;
    this.modelo.idempresa = this.vmP.idfk;



    this.guardar.emit();
  }
  databodegas: any[] = [];
  cargaBodega() {

    this.bodegasService.getall().subscribe(
      (data) => {
        this.databodegas = data.filter((item: any) => item.cestado == 'V');
        this.selectedbodegas = this.databodegas;
        console.log(this.databodegas);
      },
      (err) => {
        this.databodegas = [];
      }
    );
  }

  selectedbodegas: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedbodegas = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.databodegas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

}