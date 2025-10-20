import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/core/services/items.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-form-hardware-new-user',
  templateUrl: './form-hardware-new-user.component.html',
  styleUrls: ['./form-hardware-new-user.component.css']
})
export class FormHardwareNewUserComponent implements OnInit {
  @Input() modeloaddnewsol: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    , private readonly itemsService: ItemsService
 
    
,  private _vmP: VmParametrosService,
  ) { }
  mantenedorForm!: FormGroup;
  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  get vmP() {
    return this._vmP;
  }
 
  actualizar: boolean = false;
  ngOnInit(): void {
    
    
    this.dataitems();
     
    this.mantenedorForm = this.fb.group({
      // idhardware: [this.modelo.idhardware, [Validators.required]],
      iditems: [{value:this.modeloaddnewsol.iditems, disabled: this.actualizar}, [Validators.required, Validators.min(1)]],
     
      vmarca: [{value:this.modeloaddnewsol.vmarca, disabled: this.actualizar}, [Validators.required]],
      vmodelo: [{value:this.modeloaddnewsol.vmodelo, disabled: this.actualizar}, [Validators.required]],
      cantidad:  [{value:this.modeloaddnewsol.cantidad, disabled: this.actualizar}, [Validators.required, Validators.min(1)]],
     
      vobservacion: [{value:this.modeloaddnewsol.vobservacion, disabled: this.actualizar},],

    });
     

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

    this.modeloaddnewsol.idhardware =this.generarIntConHoraSegundosMilisegundos();
    this.modeloaddnewsol.iditems = this.mantenedorForm.get('iditems')?.value;
    this.modeloaddnewsol.desitems = this.dataItems.find(x=>x.iditems == this.modeloaddnewsol.iditems)?.desitems;
   
    this.modeloaddnewsol.vmarca = this.mantenedorForm.get('vmarca')?.value;
    this.modeloaddnewsol.vmodelo = this.mantenedorForm.get('vmodelo')?.value;
    this.modeloaddnewsol.cantidad = this.mantenedorForm.get('cantidad')?.value;
    this.modeloaddnewsol.vobservacion = this.mantenedorForm.get('vobservacion')?.value;

    this.mantenedorForm.reset();

    this.guardar.emit();
  }

  //funcion generar int con hora, segundos y milisegundos
  generarIntConHoraSegundosMilisegundos(): number {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
  
    // Convertir la hora, minutos, segundos y milisegundos en un entero único
    const uniqueInt = hours * 10000 + minutes * 1000 + seconds * 100 + milliseconds;
  
    return uniqueInt;
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
 

}
