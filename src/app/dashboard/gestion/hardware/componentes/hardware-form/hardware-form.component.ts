import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/core/services/items.service';
import { BodegasempresaService } from 'src/app/core/services/bodegas-empresa.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HistorialhardwareService } from 'src/app/core/services/historial-hardware.service';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-hardware-form',
  templateUrl: './hardware-form.component.html',
  styleUrls: ['./hardware-form.component.css'],
})
export class HardwareFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , private readonly itemsService: ItemsService
    , private readonly bodegasempresaService: BodegasempresaService
    , private readonly empresaService: EmpresaService
    ,private historialhardwareService: HistorialhardwareService
,  private _vmP: VmParametrosService,
  ) { }
  mantenedorForm!: FormGroup;
  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  get vmP() {
    return this._vmP;
  }
  verhistorial: boolean = false;
  actualizar: boolean = false;
  ngOnInit(): void {
    
    if(this.modelo.cestado=="A" || this.modelo.cestado=="R"){
      this.actualizar = true;
    }

    if(this.modelo.idhardware!=null || this.modelo.idhardware!=undefined){
      this.verhistorial = true;
    this.getDataHistorial();
    }
    this.dataitems();
    this.getdataEmpresa();

   

    if (this.modelo.idempresa) {
      this.databodegas(this.modelo.idempresa);
    }
    if (this.check_tipo != 1) {
      this.databodegas(JSON.parse(localStorage.getItem("userInfo")).idempresa);
      this.modelo.idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }


    this.mantenedorForm = this.fb.group({
      // idhardware: [this.modelo.idhardware, [Validators.required]],
      iditems: [{value:this.modelo.iditems, disabled: this.actualizar}, [Validators.required, Validators.min(1)]],
      idempresa: [{value:this.modelo.idempresa, disabled: this.actualizar}, [Validators.required, Validators.min(1)]],
      idbodega: [{value:this.modelo.idbodega, disabled: this.actualizar}],
      vmarca: [{value:this.modelo.vmarca, disabled: this.actualizar}, [Validators.required]],
      vmodelo: [{value:this.modelo.vmodelo, disabled: this.actualizar}, [Validators.required]],
      vnumerodeparte: [{value:this.modelo.vnumerodeparte, disabled: this.actualizar}, [Validators.required]],
      vnumeroserie: [{value:this.modelo.vnumeroserie, disabled: this.actualizar}, [Validators.required]],
      dfechaRegistro: [{value:this.modelo.dfechaRegistro, disabled: this.actualizar}, [Validators.required]],
      dfechamantencion: [{value:this.modelo.dfechamantencion, disabled: this.actualizar},],
      vobservacion: [{value:this.modelo.vobservacion, disabled: this.actualizar},],

    });
    // if(this.check_tipo==1){
    //   this.mantenedorForm.get('idempresa')?.enable();
    //   this.mantenedorForm.get('iditems')?.enable();
    // }

  }

  btnCancelar() {
    this.cancelar.emit();
  }
 
  
  btnGuardar() {
 
    if(this.mantenedorForm.invalid){
      return Object.values(this.mantenedorForm.controls).forEach(control=>{
        control.markAsTouched();
      });
     
    }

    this.modelo.idhardware = this.mantenedorForm.get('idhardware')?.value;
    this.modelo.iditems = this.mantenedorForm.get('iditems')?.value;
    this.modelo.idempresa = this.mantenedorForm.get('idempresa')?.value;
    this.modelo.idbodega = this.mantenedorForm.get('idbodega')?.value;
    this.modelo.vmarca = this.mantenedorForm.get('vmarca')?.value;
    this.modelo.vmodelo = this.mantenedorForm.get('vmodelo')?.value;
    this.modelo.vnumerodeparte = this.mantenedorForm.get('vnumerodeparte')?.value;
    this.modelo.vnumeroserie = this.mantenedorForm.get('vnumeroserie')?.value;
    this.modelo.dfechaRegistro = this.mantenedorForm.get('dfechaRegistro')?.value;
    this.modelo.dfechamantencion = this.mantenedorForm.get('dfechamantencion')?.value;
    this.modelo.vobservacion = this.mantenedorForm.get('vobservacion')?.value;



    this.guardar.emit();
  }


  dataItems: any[] = [];
  dataitems() {
    this.itemsService.getall().subscribe(
      (data) => {
        this.dataItems = data
      },
      (err) => {
        this.dataItems = [];
      }
    );
  }

  databodegasempresa: any[] = [];
  databodegas(idempresa: any) {
    this.bodegasempresaService.getbodegasbyempresa(idempresa).subscribe(
      (data) => {
        console.log(data);
        this.databodegasempresa = data;
      },
      (err) => {
        this.databodegasempresa = [];
      }
    );
  }


  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }


  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  tableHeadMaintainerHistorial: Array<TableHeadInterface> = [
    { name: 'idhistorialhardware', label: '#' },
    { name: 'nomusuario', label: 'Usuario' },
    { name: 'dfechahistorial_string', label: 'Fecha' },
    { name: 'vobservacion', label: 'Observación' },



  ];

  tableDataMaintainerHistorial: Array<any>;
  actionsMaintainerHistorial: Array<ActionInterface> = [
     
  ];


  getDataHistorial() {
     
    this.historialhardwareService.getIdHardware(this.vmP.idfk2).subscribe(
      (data) => {
      
        this.tableDataMaintainerHistorial = data;
      },
      (err) => {
        this.tableDataMaintainerHistorial = [];
      }
    );
  }



}