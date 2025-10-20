import { Platform } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-soliictud-retiro-ver',
  templateUrl: './soliictud-retiro-ver.component.html',
  styleUrls: ['./soliictud-retiro-ver.component.css']
})
export class SoliictudRetiroVerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private solicitudService: SolicitudService
    ,public platform: Platform
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) { }

  idsolicitudretiro: any;
  ngOnInit(): void {

    this.idsolicitudretiro = this.data.idsolicictud;
    this.getDatadetalle();
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idhardware', label: '#' }, 
        { name: 'desitems', label: 'Ítems' }, 
        { name: 'vmarca', label: 'Marca' }, 
        { name: 'vmodelo', label: 'Modelo' }, 
        { name: 'vnumeroserie', label: 'N° Serie' }, 
        { name: 'vnumerodeparte', label: 'N° Parte' }, 
        // { name: 'cantidad', label: 'Cantidad' }, 
        { name: 'vobservacion', label: 'Observación' }
 
  ];

  tableDataMaintainer: Array<any>;

  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'send',
      label: 'Retirado',
      event: 'edit',
      tooltip: '',
    },

    // {
    //   icon: 'delete',
    //   label: 'Eliminar',
    //   event: 'delete',
    //   tooltip: '',
    // },
  ];


  getDatadetalle() {

    
    this.solicitudService.getdetallesolicitud( this.idsolicitudretiro).subscribe(
      (data) => {
        console.log("detallesolitiud>>>>>",data)
        this.tableDataMaintainer =  data ;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }

  waze() {
    let lon = this.data.longitud.trim();
    let lat = this.data.latitud.trim();

    let rl2 = 'https://waze.com/ul?q=' + this.data.desdireccion.replace(/\s+/g, "%20") + '&navigate=yes';
    let url = ' https://www.waze.com/ul?ll=' + lat + '%2C' + lon + '&navigate=yes&zoom=17'

    if (this.platform.ANDROID || this.platform.IOS)
      window.open(rl2, "_blank");
    else {
      window.open(url, "_blank");
    }
  
  }

 

  maps() {
    let lon = this.data.longitud.trim();
    let lat = this.data.latitud.trim();

    let rl3 = 'https://maps.google.com/?q=' + lat + ',' + lon + '';
        let rl4 = 'https://maps.google.com/?q=' + lat + ',' + lon + '';
        // console.log(rl3);
        if (this.platform.ANDROID || this.platform.IOS)
          window.open(rl3, "_blank");
        else {
          window.open(rl4, "_blank");
        }
  }

  sendWhatsapp() {

    let numero = this.data.telefonogenera
    if (numero != null && numero != '' && numero != undefined && numero.length > 6) {
      let telefono = numero;
      if (telefono != null) {
        if (telefono.length > 0) {
          window.open('https://wa.me/56' + telefono, '_blank');
        }
      }
    } else {
      this.snackbar.notify('danger', 'El número de teléfono no es valido.');
    }

  }
}
