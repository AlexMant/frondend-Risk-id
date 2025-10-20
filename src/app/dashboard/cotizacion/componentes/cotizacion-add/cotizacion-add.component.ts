import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DireccionesService } from 'src/app/core/services/direcciones.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ModalHardwareEverwareComponent } from 'src/app/dashboard/modales/modal-hardware-everware/modal-hardware-everware.component';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-cotizacion-add',
  templateUrl: './cotizacion-add.component.html',
  styleUrls: ['./cotizacion-add.component.css']
})
export class CotizacionAddComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private readonly fb: FormBuilder,
    private direccionesService: DireccionesService,
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private envioMailService: EnvioMailService,
    private _vmP: VmParametrosService,


  ) { }

  modeloaddnewsol: any = {
    idhardware: null,
    iditems: null,
    desitems: null,

    vmarca: null,
    vmodelo: null,
    cantidad: null,

    vobservacion: null,
    origen: 3,

  };

  get vmP() {
    return this._vmP;
  }
  mantenedorFormSolUser!: FormGroup;



  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  ngOnInit(): void {

    this.getDatadirecciones();
    this.mantenedorFormSolUser = this.fb.group({

     
      observacion: ['', [Validators.required]],
      ididreccion: [null, [Validators.required]],
    });

  }


  tipoSolNuevo: boolean = false;
 
  selectTipo(event: any) {
    console.log(event);
    this.vmP.detallaherdsolicitud = [];
    
    // this.vmP.modeloUserUsuario.tiposolicitud = event;


  }





  preloader: boolean = false;
  guardar() {

    if (this.mantenedorFormSolUser.invalid) {
      return Object.values(this.mantenedorFormSolUser.controls).forEach(control => {
        control.markAsTouched();
      });

    }
    console.log("this.mantenedorFormSolUser", this.mantenedorFormSolUser.get('tiposolicitud')?.value);
  
    if (this.vmP.detallaherdsolicitud.length == 0) {
      this.snackbar.notify('danger', 'Debe agregar al menos un Hardware');
      return;
    }
   
    let bodypaso3 = {
      // idsolcitud: 0,
      //convert string empresa a int



      idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa ?? '0'),
      idusariogenerador: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??'0'),
      vobservacion: this.mantenedorFormSolUser.get('observacion')?.value ?? '',
     
      iddireccion: this.mantenedorFormSolUser.get('ididreccion')?.value,
      detsolicitud: '{"detsolicitud":' + JSON.stringify(this.vmP.detallaherdsolicitud) + '}',
    }
    console.log("bodypaso3", bodypaso3);

    this.dialog
      .open(ConfirmModalComponent, {
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        width: '400px',
        data: {
          type: 'warning',
          title: 'Generar Cotización',
          titleventana: 'Generar Cotización',
          message: '¿Seguro que desea enviar la cotización?',
          btnText: 'Si, Seguro',
          btnTextSecondary: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.preloader = true;
          this.solicitudService.insertacotizacion(bodypaso3).subscribe(
            (data) => {
              console.log("data", data);
             this.enviaMail(data);

            },
            (err) => {
              console.log("err", err);
              this.preloader = false;
              this.snackbar.notify('danger', 'Error al registrar la cotizacion');

            }
          );
        }
      });



  }
 
  hardwareNuevo() {
    let bottonSheet = this._bottomSheet.open(ModalHardwareEverwareComponent, {

      data: JSON.parse(localStorage.getItem("userInfo")).idusuario,
      disableClose: false,
      autoFocus: false,

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // this.router.navigateByUrl('');
      if (result == true) {
        // this.getData();
      }
    });

  }

  guardarnewhardware() {

    // console.log("modeloaddnewsol", this.modeloaddnewsol);


    let Addos = [];
    Addos = this.vmP.detallaherdsolicitud

    const agregados = this.vmP.detallaherdsolicitud.filter((element: any) => element.origen === 3 || element.origen === 2);
    // console.log("agregados", agregados);

    const selectAll2 = [];

    selectAll2.push({
      idhardware: this.modeloaddnewsol.idhardware,
      iditems: this.modeloaddnewsol.iditems,
      desitems: this.modeloaddnewsol.desitems,
      vmarca: this.modeloaddnewsol.vmarca,
      vmodelo: this.modeloaddnewsol.vmodelo,
      cantidad: this.modeloaddnewsol.cantidad,
      vobservacion: this.modeloaddnewsol.vobservacion,
      origen: 3,
    });

    selectAll2.push(...agregados.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vmodelo: element.vmodelo,
        cantidad: element.cantidad,
        vobservacion: element.vobservacion,
        origen: element.origen,
      };
    }
    ));

    this.vmP.detallaherdsolicitud = []
    this.vmP.detallaherdsolicitud = selectAll2.map((element) => {
      return {
        idhardware: element.idhardware,
        iditems: element.iditems,
        desitems: element.desitems,
        vmarca: element.vmarca,
        vmodelo: element.vmodelo,
        cantidad: element.cantidad,
        vobservacion: element.vobservacion,
        origen: element.origen,
      };
    });


    this.modeloaddnewsol = {
      idhardware: null,
      iditems: null,
      desitems: null,

      vmarca: null,
      vmodelo: null,
      cantidad: null,

      vobservacion: null,
      origen: 3,

    };

    // console.log("this._vmP.detallaherdsolicitud", this._vmP.detallaherdsolicitud);
  }

  datadirecciones: any[] = [];
  getDatadirecciones() {

    const idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario;
    this.direccionesService.getallbyusuario(idusuario).subscribe(
      (data) => {
        // console.log("direcciones", data);
        this.datadirecciones = data
      },
      (err) => {
        this.datadirecciones = [];
      }
    );
  }


  enviaMail(data:any) {

    const datsusuario = data.filter((element: any) => element.idtipo_usuario === 2);
    const admins = data.filter((element: any) => element.idtipo_usuario != 2);

console.log("datsusuario",datsusuario);
console.log("admins",admins);
    let modeloMail = {
      titulo: "Cotización ingresada",
      subtitulo: "Se ha creado una nueva cotización",
      textouno: "" + datsusuario[0].nombreUsuario + ", se ha creado una nueva cotización con el código  "+datsusuario[0].codigosolicitud+".",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Confirmación de cotización",
      nombre: datsusuario[0].nombreUsuario + ' ' + datsusuario[0].primerapellido,
      email: datsusuario[0].mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();

    let bodyetapa4 = admins.map((element: any) => {
      return {
        titulo: "Cotización ingresada",
        subtitulo: "Se ha ingresado una cotización al sistema.",

        textouno: element.nombreUsuario + ", se  ha ingresado una nueva cotización con el código  "+datsusuario[0].codigosolicitud+ ".<br> Por favor, revise su panel de administración.",

        textodos: "Equipo RISK-ID. ",
        linkboton: "",
        asunto: "Cotización  ingresada",
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
    this.snackbar.notify('success', 'Solicitud creada exitosamente');
    this.router.navigate(['./../'], {
      relativeTo: this.activatedRoute,
    });
    

  }
  
  
  
  volver() {
   

    this.router.navigate(['./../'], {
      relativeTo: this.activatedRoute
    });
  }	

}
