import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subject } from 'rxjs';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { GEmpresasService } from 'src/app/core/services/gempresas.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TiposEmpresaService } from 'src/app/core/services/tipos-empresa.service';
import { Fx } from 'src/app/utils/functions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
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
    private tiposdeEmpresas: TiposEmpresaService
  ) {

     this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }
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
        this.tiposempresa();
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

   selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

tiposempresasdata: any[] = [];
   tiposempresa() {
    this.tiposdeEmpresas.getall().subscribe(
      (data) => {
        this.tiposempresasdata = data.data;
        
        console.log("tiposempresasdata",this.tiposempresasdata);
      },
      (err) => {
        this.tiposempresasdata = [];
      }
    );
  }
 

}