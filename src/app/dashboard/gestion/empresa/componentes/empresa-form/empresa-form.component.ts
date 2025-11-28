import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { GEmpresasService } from 'src/app/core/services/gempresas.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
})
export class EmpresaFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private empresaService: EmpresaService,
    private gempresaservice: GEmpresasService,
  ) { }
  mantenedorForm!: FormGroup;

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {



    this.mantenedorForm = this.fb.group({
      //  idempresa: [this.modelo.idempresa], 
      nombre: [this.modelo.nombre, [Validators.required]],
      rut: [this.modelo.rut, [Validators.required]],
      
      observaciones: [this.modelo.observaciones],
      codigo: [this.modelo.codigo],
      holdingid: [this.modelo.holdingId],
     
    });

        this.getCargaEmpresa();
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

    //  this.modelo.idempresa = this.mantenedorForm.get('idempresa')?.value;

    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.rut = this.mantenedorForm.get('rut')?.value;
    this.modelo.estado = this.mantenedorForm.get('estado')?.value;
    this.modelo.observaciones = this.mantenedorForm.get('observaciones')?.value;
    this.modelo.codigo = this.mantenedorForm.get('codigo')?.value;
 


    this.guardar.emit();
  }

  validaRut() {
    let rut = this.mantenedorForm.get('rut')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.mantenedorForm.patchValue({ ['rut']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.mantenedorForm.patchValue({ ['rut']: '' })
      this.mantenedorForm.controls['rut'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['rut'].markAsTouched();
    }

  }


  
  selectholding: any[] = [];
 
  getCargaEmpresa() {

    
    this.gempresaservice.getall().subscribe(
      (data) => {
        console.log('dataempresas', data);
        let data_filtrada = data.data;

        this.selectholding = data_filtrada;
       
      },
      (err) => {
        this.selectholding = [];
      }
    );



  }
 

}