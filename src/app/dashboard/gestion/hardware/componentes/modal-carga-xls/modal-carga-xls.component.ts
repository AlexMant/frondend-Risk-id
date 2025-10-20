import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';
import * as xls from 'xlsx';
import { TempHardwareService } from 'src/app/core/services/temp-hardware.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ExportxlsService } from 'src/app/core/services/exportxls.service';

@Component({
  selector: 'app-modal-carga-xls',
  templateUrl: './modal-carga-xls.component.html',
  styleUrls: ['./modal-carga-xls.component.css']
})
export class ModalCargaXlsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private snackbar: NotificationService,
    private exportxlsService: ExportxlsService,
    private _tempHardwareService: TempHardwareService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) { }

  ngOnInit(): void {
    console.log("this.data", this.data)
    console.log("this.generateId", this.generateId())
  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  preloader: boolean = false;
  onCloseClick(): void {
    this.modelocarga = [];
    this.dataErrors = [];
    this.erroesEnCarga = false;
    this.caraRealizada = false;
    this.nombre_archivo = '';
    this._bottomSheetRef.dismiss(this.recargardata);
  }

  modelocarga: any[] = [ ];

  recargardata:boolean=false;
  filecargado: any;
  caraRealizada: boolean = false;
  nombre_archivo: string = '';
  readExcelFileNombre(e: any) {
    // this.preloader = true;
    this.filecargado = e.target.files[0];

    this.modelocarga = [];
    this.dataErrors = [];
    this.erroesEnCarga = false;
    this.caraRealizada = true;
    this.nombre_archivo = this.filecargado.name;
  }

  titleloading: string = '';
  readExcelFile() {
    this.titleloading = 'leyendo archivo...';
    this.preloader = true;
    // const file = e.target.files[0];
    let fr = new FileReader();

    fr.readAsArrayBuffer(this.filecargado);

    fr.onload = () => {

      let data = fr.result;
      let workbook = xls.read(data, { type: 'array' });

      const sheetname = workbook.SheetNames[0];

      const sheet1 = workbook.Sheets[sheetname]



      // this.users=xls.utils.sheet_to_json(sheet1,{raw:true});
      // console.log(xls.utils.sheet_to_json(sheet1, { raw: true }))

      let data2 = xls.utils.sheet_to_json(sheet1, { raw: true });

      for (let i = 0; i < data2.length; i++) {
        const element: any = data2[i];
        // console.log("element",element)


        this.modelocarga.push({

          desitem: element.ITEM == undefined ? '' : element.ITEM,
          vmarca: element.MARCA == undefined ? '' : element.MARCA,
          vmodelo: element.MODELO == undefined ? '' : element.MODELO,
          vnumerodeparte: element.NPARTE == undefined ? '' : element.NPARTE,
          vnumeroserie: element.NSERIE == undefined ? '' : element.NSERIE,
          dfechamantencion: element.FMANTENCION == undefined ? '' : element.FMANTENCION,
          vobservacion: element.DESCRIPCIoN == undefined ? '' : element.DESCRIPCIoN,
          idbodega: element.BIODEGA == undefined ? 0 : element.BIODEGA,
          mailUsuario: element.USUARIO == undefined ? '' : element.USUARIO
        }
        )

      }
      // console.log("this.modeloCarga", this.modelocarga)
      this.guardarCarga();


    }


  }

  guardarCarga() {

    this.titleloading = 'Guardando carga en la base de datos...';
    let idcarga = this.generateId();
    let modeloCarga = {
      idcarga: idcarga,
      detalleCarga: this.modelocarga
    }
    this._tempHardwareService.post(modeloCarga).subscribe(
      (data) => {

        this.validaeinsertacarga(idcarga);
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );
  }

  erroesEnCarga: boolean = false;
  dataErrors: any[] = [];
  validaeinsertacarga(idcarga: any) {

    this.titleloading = 'Validando carga en la base de datos...';
    {
      let modeloCarga = {
        idempresa: this.data.idempresa,
        idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
        idcarga: idcarga
      }
      this._tempHardwareService.inscargaexcel(modeloCarga).subscribe(
        (data) => {
          console.log("validaeinsertacarga", data)

          console.log("inscargaexcel", data)
          if (data.length > 0) {
            this.snackbar.notify('warning', 'Existen lineas con errores');
            this.erroesEnCarga = true;
            this.dataErrors = data;
          } else {
            this.snackbar.notify('success', 'Registro cargados exitosamente');
            this.erroesEnCarga = false;
          }
          this.recargardata = true;
          this.preloader = false;
          this.caraRealizada = false;
        },
        (err) => {
          console.log(err);
          this.snackbar.notify(
            'danger',
            'Error al intentar agregar el registro.'
          );
        }
      );
    }
  }


  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    // return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  guardar() {

  }



  //funcion que genera un id segun fecha hora minutos y segundos
  generateId() {
    let date = new Date();
    let id = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
    return id;
  }


  exportToExcel() {
    this.titleloading = 'Generando Archivo Excel...';
    this.preloader = true;
    if (this.dataErrors.length > 0) {
      this.excel(this.dataErrors);
    } else {
      this.snackbar.notify(
        'danger',
        'No hay datos para exportar'
      );
      this.preloader = false;
    }
  }

  excel(data: any) {
    let newDataXLS: any;

    newDataXLS = data.map((element) => {
      return {


        'ITEM': element.desitem,
        'MARCA': element.vmarca,
        'MODELO': element.vmodelo,
        'NPARTE': element.vnumerodeparte,
        'NSERIE': element.vnumeroserie,
        'FMANTENCION': element.dfechamantencion,
        'DESCRIPCION': element.vobservacion,
        'BODEGA': element.idbodega,
        'USUARIO': element.mailUsuario,
        'ERRORES': element.error,

      };

    });

    this.exportxlsService.exportToExcel(
      newDataXLS,
      this.nombre_archivo + '_ERRORES'
    )
    this.snackbar.notify(
      'success',
      'Archivo Generado, favor verificar su carpeta de descargas'
    );
    this.preloader = false;


    

  }

  DescargarPlantilla() {
    //href="assets/Formato-Carga/Formato-Carga.xlsx"
 
    // let url = '../../../../../assets/Formato-Carga/Formato-Carga.xlsx';
       let url = '../../../../../../../assets/formato/FORMATO_CARGA.xlsx';
   
      this.downloadFile(url);
    

  } 
    downloadFile(filePath){
    var link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    console.log("link",link)
    link.click();
}
 



}
