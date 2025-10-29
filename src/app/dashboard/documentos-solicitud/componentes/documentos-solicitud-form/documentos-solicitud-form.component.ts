import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-documentos-solicitud-form',
  templateUrl: './documentos-solicitud-form.component.html',
  styleUrls: ['./documentos-solicitud-form.component.css'],
})
export class DocumentossolicitudFormComponent implements OnInit {
  @Input() modeloarchivos: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private snackbar: NotificationService,
  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({

      vobservaciondoc: [this.modeloarchivos.vobservaciondoc, [Validators.required]],
      tipodoc: [null,],
    });
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
 

    if(this.filecarga == '' || this.filecarga == null){
      this.snackbar.notify('danger', 'Debe agregar un archivo');
      return;
    }
    this.modeloarchivos.vobservaciondoc = this.mantenedorForm.get('vobservaciondoc')?.value;
    this.modeloarchivos.basedoc = this.filecarga;
    this.modeloarchivos.nombre_archivo = this.nombre_archivo;


    this.mantenedorForm.reset();
    this.mantenedorForm.patchValue({ ['vobservaciondoc']: '' })
 

    this.guardar.emit();
  }

  filecargado: any;
  filecarga: string;
  nombre_archivo: string = '';
  readExcelFileNombre(e: any) {
    // this.preloader = true;
    this.filecargado = e.target.files[0];


    this.nombre_archivo = this.filecargado.name;
  }


  tamañoArchivo: number = 0;

  capturarFile(event: any) {

     console.log("cambioArchivo", event.target.files[0].type);
    // console.log("event.target.files[0].length", event.target.files.length);
    //&& event.target.files[0].type != 'image/gif' && event.target.files[0].type != 'image/svg+xml'
    if (event.target.files[0].type != 'application/pdf') {

      this.snackbar.notify('danger', 'Archivo no valido, favor seleccionar un PDF valido');
      this.filecarga = '';
      return;
    }

    if (event.target.files.length > 0) {
      this.tamañoArchivo = event.target.files[0].size;
      console.log("tamañoArchivo", this.tamañoArchivo);
      if (this.tamañoArchivo > 5000000) {
        this.snackbar.notify('danger', 'El tamaño del archivo no puede superar los 5MB');

        this.filecarga = '';
      } else {
        this.nombre_archivo = event.target.files[0].name;

        this.extraerBase64(event.target.files[0]).then((imagen: any) => {

          this.filecarga = imagen.base;

        }
        );


      }
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      //   const unsafeImg = window.URL.createObjectURL($event);
      //  const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }

  });

  descargarArchivoBase64(nombreArchivo: string, basearchivo: string) {
    this.downloadAsPDF(basearchivo);
    // const byteCharacters = atob(basearchivo);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = nombreArchivo;
    // link.click();
  }

  downloadAsPDF(base64String) {

   
  
    if (base64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
      this.downloadFileObject(base64String);
    } else if (base64String.startsWith("data:application/pdf;base64")) {
      this.downloadFileObject(base64String);
    } else {
      alert("Not a valid Base64 PDF string. Please check");
    }
  
  }
  
  downloadFileObject(base64String) {
    const linkSource = base64String;
    const downloadLink = document.createElement("a");
    const fileName = "convertedPDFFile.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}