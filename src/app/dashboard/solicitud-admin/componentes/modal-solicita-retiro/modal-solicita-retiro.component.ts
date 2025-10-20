import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SoliictudretiroService } from 'src/app/core/services/soliictud-retiro.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-modal-solicita-retiro',
  templateUrl: './modal-solicita-retiro.component.html',
  styleUrls: ['./modal-solicita-retiro.component.css']
})
export class ModalSolicitaRetiroComponent implements OnInit , OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private _vmP: VmParametrosService,
  
    private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private router: Router,
    
    private activatedRoute: ActivatedRoute,
    private envioMailService: EnvioMailService,
    private soliictudretiroService: SoliictudretiroService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) { }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  get vmP() {
    return this._vmP;
  }
  mantenedorForm!: FormGroup;
  modeloguardar: any;
  modelosolicitaretiro: any = {
    
    idsolicictud: this.vmP.idfk2,
    idusuariosolicita: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    vobservacion_retiro: null
  };
  ngOnInit(): void {

 
    console.log("this.data",  this.data)
    this.mantenedorForm = this.fb.group({

      vobservacion_retiro: [null, [Validators.required]],

    });
  }



  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }
  preloader: boolean = false;
  guardar() {

    this.preloader = true;
    let observaciones = this.mantenedorForm.get('vobservacion_retiro')?.value;

    this.modelosolicitaretiro.vobservacion_retiro = observaciones;

    this.soliictudretiroService.insertasolicitudretiro( this.modelosolicitaretiro).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha asignado correctamente .');
       this.enviaMail(data);
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      }
    );
  }
 

  enviaMail(data:any) {

    

    let bodyetapa4 = data.map((element: any) => {
      return {
        titulo: "Solicitud de retiro",
        subtitulo: "Se ha ingresado una solicitud de retiro al sistema.",

        textouno: element.nombreUsuario + ", se  ha ingresado una nueva solicitud de retiro, código solicitud de referencia: "+ element.codigosolicitud +".<br> Por favor, revise su panel de administración.",

        textodos: "Equipo RISK-ID. ",
        linkboton: "",
        asunto: "Solicitud de retiro ingresada",
        nombre: element.nombreUsuario + ' ' + element.primerapellido,
        email: element.mail,
        modo: "1"
      }
    });

    for (let index = 0; index < bodyetapa4.length; index++) {

      const element = bodyetapa4[index];
      this.envioMailService.mailform(element).pipe(takeUntil(this.componentDestroyed$)).subscribe();
     

    }

    this.preloader = false;
    this.snackbar.notify('success', 'Solicitud de retiro creada exitosamente');
    // this.router.navigate(['./../list'], {
    //   relativeTo: this.activatedRoute,
    // });
    this._bottomSheetRef.dismiss(true);

  }
}
