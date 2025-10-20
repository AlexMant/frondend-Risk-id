import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css'],
})
export class ItemsFormComponent  implements OnInit, OnDestroy{
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private snackbar: NotificationService,
  ) { }
  mantenedorForm!: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject();
  imagen: string;

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  ngOnInit(): void {

    this.mantenedorForm = this.initForm();

   
  }

  initForm(): FormGroup {

    this.imagen = this.modelo.vimgitem;
    return this.fb.group({
      iditems: [this.modelo.iditems],
      desitems: [this.modelo.desitems, [Validators.required]],
      vimgitem: [this.modelo.vimgitem],
      cestado: [this.modelo.cestado, [Validators.required]],

    });
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    console.log(this.imagen);
    if(this.mantenedorForm.invalid){
      return Object.values(this.mantenedorForm.controls).forEach(control=>{
        control.markAsTouched();
      });
     
    }
    if(this.imagen == null){
      this.snackbar.notify('danger', 'Debe seleccionar una imagen');
      return;
    }
    // this.modelo.iditems = this.mantenedorForm.get('iditems')?.value;
    this.modelo.desitems = this.mantenedorForm.get('desitems')?.value;
    this.modelo.vimgitem = this.imagen;
    this.modelo.cestado = this.mantenedorForm.get('cestado')?.value;



    this.guardar.emit();
  }



  tamañoArchivo: number = 0;

  capturarFile(event: any) {
    // console.log("cambioArchivo", event);
    // console.log("cambioArchivo", event.target.files[0]);
    //&& event.target.files[0].type != 'image/gif' && event.target.files[0].type != 'image/svg+xml'
    if (event.target.files[0].type != 'image/png' && event.target.files[0].type != 'image/jpeg' && event.target.files[0].type != 'image/jpg') {

      this.snackbar.notify('danger', 'Archivo No valida, favor seleccionar una imagen valida');

    } else {
      this.tamañoArchivo = event.target.files[0].size;
      if (this.tamañoArchivo > 1000000) {
        this.snackbar.notify('danger', 'El tamaño del archivo no puede superar los 1MB');


      } else {
        this.extraerBase64(event.target.files[0]).then((imagen: any) => {

          this.imagen = imagen.base;

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

}