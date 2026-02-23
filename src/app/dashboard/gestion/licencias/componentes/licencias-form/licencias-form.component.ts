import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashService } from 'src/app/core/services/flash.service';
import { TiposLicenciaService } from 'src/app/core/services/tipos-licencia.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-licencias-form',
  templateUrl: './licencias-form.component.html',
  styleUrls: ['./licencias-form.component.css'],
})
export class LicenciasFormComponent implements OnInit {

  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(

    private readonly fb: FormBuilder
    , private readonly tipolicenciaService: TiposLicenciaService
    , private readonly _vmP: VmParametrosService
    , private readonly flashservice: FlashService


  ) { }
  mantenedorForm!: FormGroup;
  get vmP() {
    return this._vmP;
  }
  nombreTrabajador: string = '';
  ngOnInit(): void {
 this.nombreTrabajador = this._vmP.des1;
    this.getdatatipolicencias();
    this.getCargaFlash();
    this.mantenedorForm = this.fb.group({


      flashId: [this.modelo.flashId],
      fechaInicio: [this.modelo.fechaInicio, [Validators.required]],
      fechaTermino: [this.modelo.fechaTermino, [Validators.required]],
      tipolicenciaId: [this.modelo.tipoLicenciaId],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    const datePipe2 = new DatePipe('es');


    this.modelo.trabajadorId = this.vmP.idfk;
    this.modelo.flashId = this.mantenedorForm.get('flashId')?.value ?? undefined;

    this.modelo.fechaInicio = datePipe2.transform(this.mantenedorForm.get('fechaInicio')?.value, 'yyyy-MM-dd');

    this.modelo.fechaTermino = datePipe2.transform(this.mantenedorForm.get('fechaTermino')?.value, 'yyyy-MM-dd');
    this.modelo.tipoLicenciaId = this.mantenedorForm.get('tipolicenciaId')?.value ?? undefined;

  
    this.guardar.emit();
  }



  datatipolicencias: any[] = [];
  getdatatipolicencias() {


    this.tipolicenciaService.getall().subscribe(
      (data) => {
        console.log('tipolicencias', data);
        this.datatipolicencias = data.data;
      },
      () => {
        this.datatipolicencias = [];
      }
    );

  }


  selectReporteFlash: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectReporteFlash = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataflash) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  dataflash: any[] = [];

  getCargaFlash() {

    let params = '?empresaId=' + this._vmP.idfk2;
  
    this.flashservice.getbyparams(params).subscribe(
      (data) => {
        console.log('flash', data);
        let data_filtrada = data.data;


        this.dataflash = data_filtrada;
        this.selectReporteFlash = data_filtrada;

      },
      (err) => {
        this.dataflash = [];
        this.selectReporteFlash = [];
      }
    );
  }

  leerarchivoCargado( ) {
    const file = this.selectedFile;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        this.modelo.archivos[0].originalName = file.name;
        this.modelo.archivos[0].mimetype = file.type;
        this.modelo.archivos[0].size = file.size;
        this.modelo.archivos[0].base64Data = base64Data;
        console.log('Archivo cargado:', this.modelo.archivos[0]);
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
      };
    }
  }


  @ViewChild('fileInput') fileInput!: ElementRef;

  // Form control to display the selected file name
  fileNameDisplayControl = new FormControl('');

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
      // Update the display form control with the file name
      this.fileNameDisplayControl.setValue(this.selectedFile.name);
      console.log('Selected file:', this.selectedFile.name);

      this.leerarchivoCargado();
      // You can now proceed to upload the file to your backend
    }
  }

      // Función pública para ser llamada desde el padre
    limpiarFormulario(): void {
      // Aquí puedes poner la lógica que desees ejecutar
      this.mantenedorForm.reset();
      this.fileNameDisplayControl.reset();
      this.selectedFile = null;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
      console.log('Función ejecutada desde el padre');
       
    }

}