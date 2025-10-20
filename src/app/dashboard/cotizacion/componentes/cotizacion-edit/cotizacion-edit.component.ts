import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { DireccionesService } from 'src/app/core/services/direcciones.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
 
import { SubMenueditCotizacionItListService } from './sub-menueditcotizacion-it-list.service';

@Component({
  selector: 'app-cotizacion-edit',
  templateUrl: './cotizacion-edit.component.html',
  styleUrls: ['./cotizacion-edit.component.css']
})
export class CotizacionEditComponent implements OnInit {

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
    private readonly subMenueditCotizacionItListService: SubMenueditCotizacionItListService,
    private _vmP: VmParametrosService,

  ) { 
    if(this.vmP.idfk2 == null || this.vmP.idfk2 == undefined){
      this.router.navigate(['./../'], {
        relativeTo: this.activatedRoute
      });
    }

  }
  tipoSolExistente:boolean = true;
  tipoSolNuevo:boolean = false;
  preloader:boolean = false;

  get vmP() {
    return this._vmP;
  }

  vcodigosolicitud: any;
  fecha_string: any;
  vobservacion: any;
  desdireccion:any;
  desestado:any;
  ngOnInit(): void {
    this.getDatacabecera();
    this.getDatadetalle();
    this.vmP.detallaherdsolicitud = [];
  }




  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenueditCotizacionItListService.dataColumnEditSolicituduser( this.vmP.idfk3);

  actionsMaintainer: Array<ActionInterface> = this.subMenueditCotizacionItListService.datasubMenuEditSolicituduser( this.vmP.idfk3);

  tableDataMaintainer: Array<any>;

  getDatadetalle() {

    
    this.solicitudService.getdetallesolicitud( this.vmP.idfk2).subscribe(
      (data) => {
        console.log("detallesolitiud>>>>>",data)
        this.tableDataMaintainer =  data ;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  estadjoson:any={}
  colorestados:any;
  getDatacabecera() {

    
    this.solicitudService.getcabecerasolicitud( this.vmP.idfk2).subscribe(
      (data) => {
        console.log("getconsultasolicitud",data)
        this.vcodigosolicitud= data[0].vcodigosolicitud;
        this.fecha_string= data[0].fecha_string;
        this. vobservacion= data[0].vobservacion;
        this.desdireccion= data[0].desdireccion;
        this.desestado= data[0].desestado;
    
        this.colorestados = this.colorEstado(data[0].idestado)
        console.log('this.estadjoson',  this.estadjoson)
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  
  }
 

  desestadoHardware(estado: any): string {
    switch (estado) {
      case 1:
        return 'Abierta';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Cerrada';
      case 0:
        return 'Sin Estado';
      default:
        return '';
    }
  }
  colorEstado(estado: any): string {
    switch (estado) {
      case 3:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';
    
      default:
        return '';
    }
  }

  volver() {
   

    this.router.navigate(['./../'], {
      relativeTo: this.activatedRoute
    });
  }	

}
