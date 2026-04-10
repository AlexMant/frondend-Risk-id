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
import { PermisoService } from 'src/app/core/services/permiso.service';
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
    , public permisoService: PermisoService
  ) {

    this.filteredtipoemp = this.tipoempCtrl.valueChanges.pipe(
      startWith(null),
      map((tipoemp: string | null) => (tipoemp ? this._filter(tipoemp) : this.alltipoemp.slice())),
    );
  }
  mantenedorForm!: FormGroup;
  editarform: boolean = true;
  ngOnDestroy(): void {


    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {

        if (this.modelo.accion == 'U') {
      this.editarform = this.permisoService.tienePermisoCompuesto('ADMIN_EMPRESA', 'editar') ? true : false;
    }

    this.tipoemps = this.modelo.tiposEmpresa ? this.modelo.tiposEmpresa.map(item => item) : [];

    this.mantenedorForm = this.fb.group({
      //  idempresa: [this.modelo.idempresa], 
      nombre: [{value: this.modelo.nombre, disabled: !this.editarform}, [Validators.required]],
      rut: [{value: this.modelo.rut, disabled: !this.editarform}, [Validators.required]],

      observaciones: [{value: this.modelo.observaciones, disabled: !this.editarform}],
      codigo: [{value: this.modelo.codigo, disabled: !this.editarform}],
      holdingid: [{value: this.modelo.holdingId, disabled: !this.editarform}],

    });

    this.getCargaEmpresa();
    this.tiposempresa();
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    if (this.mantenedorForm.invalid) {
      return Object.values(this.mantenedorForm.controls).forEach(control => {
        control.markAsTouched();
      });

    }

    //  this.modelo.idempresa = this.mantenedorForm.get('idempresa')?.value;

    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.rut = this.mantenedorForm.get('rut')?.value;
    this.modelo.estado = this.mantenedorForm.get('estado')?.value;
    this.modelo.observaciones = this.mantenedorForm.get('observaciones')?.value;
    this.modelo.codigo = this.mantenedorForm.get('codigo')?.value;
    this.modelo.holdingId = this.mantenedorForm.get('holdingid')?.value;
    this.modelo.tiposEmpresa = this.tipoemps.map(item => item);


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
        let data_filtrada = data.data.filter((item: any) => item.esta_activo === true);

        this.selectholding = data_filtrada;

      },
      (err) => {
        this.selectholding = [];
      }
    );



  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tipoempCtrl = new FormControl('');
  filteredtipoemp: Observable<string[]>;
  tipoemps: string[] = [];
  alltipoemp: string[] = [];

  @ViewChild('tipoempInput') tipoempInput: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tipoemps.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tipoempCtrl.setValue(null);
  }

  remove(tipoemp: string): void {
    const index = this.tipoemps.indexOf(tipoemp);

    if (index >= 0) {
      this.tipoemps.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tipoemps.push(event.option.viewValue);
    this.tipoempInput.nativeElement.value = '';
    this.tipoempCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltipoemp.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  tiposempresasdata: any[] = [];
  tiposempresa() {
    this.tiposdeEmpresas.getall().subscribe(
      (data) => {
        this.tiposempresasdata = data.data;
        this.alltipoemp = this.tiposempresasdata.map(item => item.nombre);
        console.log(" this.alltipoemp", this.alltipoemp);
      },
      (err) => {
        this.tiposempresasdata = [];
      }
    );
  }


}