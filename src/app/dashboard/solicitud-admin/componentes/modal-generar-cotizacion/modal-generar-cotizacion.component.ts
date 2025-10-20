import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-generar-cotizacion',
  templateUrl: './modal-generar-cotizacion.component.html',
  styleUrls: ['./modal-generar-cotizacion.component.css']
})
export class ModalGenerarCotizacionComponent implements OnInit , OnDestroy {
 
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("sortData0") sortData0 = new MatSort();
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private _vmP: VmParametrosService,
    private dialog: MatDialog,
    private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private router: Router,
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private envioMailService: EnvioMailService,
 
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
  modelogenerarcotizacion: any = {
    dfecha: null,
    idsolicictud: this.vmP.idfk2,
    idusuariosolicita: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    iestadoretiro: 1,
    vobservacion_retiro: null
  };
  ngOnInit(): void {

 
    console.log("this.data",  JSON.parse(this.data))
    this.dataSource.data = JSON.parse(this.data);
    this.mantenedorForm = this.fb.group({

      vobservacion_retiro: [null, [Validators.required]],

    });
  }
  filterValues = {};
  public displayedColumns: string[] = ["desitems", "vmarca","vmodelo","cantidad","vobservacion","accion"];

 

  public dataSource = new MatTableDataSource();

  ngAfterViewInit(): void {


    this.dataSource.sort = this.sortData0;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
     
     
  }

  filterTable(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
  }

  changePaginador(e: PageEvent) {
    console.log('changePaginador', e);
   this.pageEvent.emit(e);
 }

 addComentariohardware(event: any,origen:any) {
  console.log("event", event);



}

 btnGuardarOpcion(value: any[], idhardware: any, chek_opcion: any) {

   
}
//funcion para buscar valor en un arrelor de objetos y eliminar la posicion
eliminarhardware(id: any) {
  console.log("id", id);
  const index = this.dataSource.data.findIndex((element: any) => element.idhardware === id);
  this.dataSource.data.splice(index, 1);
  const index2 =  this.dataSource.data
  this.dataSource.data = []
  this.dataSource.data.push(...index2)
  console.log("this.detallaherdsolicitud", this.dataSource.data);
}

  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }
  preloader: boolean = false;
  guardar() {

    if (this.mantenedorForm.invalid) {
      return Object.values(this.mantenedorForm.controls).forEach(control => {
        control.markAsTouched();
      });

    }

   
    let observaciones = this.mantenedorForm.get('vobservacion_retiro')?.value;

    this.modelogenerarcotizacion.vobservacion_retiro = observaciones;
    if(this.dataSource.data.length==0){
      this.snackbar.notify('danger', 'No se ha agregado ningun hardware.');
      return;
    }
    
    const hardware:any = this.dataSource.data;

    const DataGuardar = hardware.map((element) => {
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

    let bodypaso3 = {
      // idsolcitud: 0,
      //convert string empresa a int



      
      idusariogenerador: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??'0'),
      idsolicitudbase: this.vmP.idfk2,
      vobservacion: observaciones ?? '',
      detsolicitud: '{"detsolicitud":' + JSON.stringify(DataGuardar) + '}',
    }


   
    console.log("this.modelosolicitaretiro",  this.dataSource.data) 


    this.dialog
      .open(ConfirmModalComponent, {
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        width: '400px',
        data: {
          type: 'warning',
          title: 'Generar Solicitud',
          titleventana: 'Generar Solicitud',
          message: '¿Seguro que desea enviar la solicitud?',
          btnText: 'Si, Seguro',
          btnTextSecondary: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.preloader = true;
          this.solicitudService.generacotizabysolicitud(bodypaso3).subscribe(
            (data) => {
              console.log("data", data);
             this.enviaMail(data);

            },
            (err) => {
              console.log("err", err);
              this.preloader = false;
              this.snackbar.notify('danger', 'Error al registrar la solicitud');

            }
          );
        }
      });

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

        textouno: element.nombreUsuario + ", se  ha ingresado una nueva cotización con el código  "+element.codigosolicitud+".<br> Por favor, revise su panel de administración.",

        textodos: "Equipo RISK-ID. ",
        linkboton: "",
        asunto: "cotización  ingresada",
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
    this.snackbar.notify('success', 'Cotización creada exitosamente');
    this._bottomSheetRef.dismiss(true);
    

  }
  
}
