import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { ExportxlsService } from 'src/app/core/services/exportxls.service';
import { ItemsService } from 'src/app/core/services/items.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { SubMenuInformeInventarioService } from './sub-menu-informe-inventario.service';
import { BodegasempresaService } from 'src/app/core/services/bodegas-empresa.service';
import { HardwareService } from 'src/app/core/services/hardware.service';
@Component({
  selector: 'app-informe-control-inventario',
  templateUrl: './informe-control-inventario.component.html',
  styleUrls: ['./informe-control-inventario.component.css']
})
export class InformeControlInventarioComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog
    ,private snackbar: NotificationService
    ,private router: Router

    ,private readonly fb: FormBuilder

    ,private activatedRoute: ActivatedRoute

    ,private _vmP: VmParametrosService
    ,private exportxlsService: ExportxlsService
     
    ,private bodegasempresaService: BodegasempresaService
    , private readonly empresaService: EmpresaService
    , private readonly itemsService: ItemsService
    , private subMenuInformeInventarioService: SubMenuInformeInventarioService
    ,private hardwareService: HardwareService

  ) {



  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get vmP() {
    return this._vmP;
  }
  mantenedorFormHardware!: FormGroup;

  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloUsuario: any = {
    idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    empresa: null,
    estado: "A",
    items: null,
    bodega: null,
    fecha_desde: null,
    fecha_hasta: null,
  }


  ngOnInit(): void {
    // this.getData();
    if (this.vmP.filtrosinformeInventario.busquedaActiva) {
      this.modeloUsuario.items = this.vmP.filtrosinformeInventario.items;
      this.modeloUsuario.bodega = this.vmP.filtrosinformeInventario.bodega;
      this.modeloUsuario.estado = this.vmP.filtrosinformeInventario.estado;

      this.modeloUsuario.empresa = this.vmP.filtrosinformeInventario.empresa;
      this.modeloUsuario.fecha_desde = this.vmP.filtrosinformeInventario.fechaDesde;
      this.modeloUsuario.fecha_hasta = this.vmP.filtrosinformeInventario.fechaHasta;
      this.getData();
    }
    this.getdataEmpresa();
    this.getdataitems();
    this.mantenedorFormHardware = this.fb.group({
      items: [this.modeloUsuario.items],
      idbodega: [this.modeloUsuario.bodega],
      empresa: [this.modeloUsuario.empresa],
      fecha_desde: [this.modeloUsuario.fecha_desde],
      fecha_hasta: [this.modeloUsuario.fecha_hasta],

    });
    if (this.check_tipo != 1) {
      this.cargaBodega();
    }

  }



  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuInformeInventarioService.dataColumnsInformeInventario(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuInformeInventarioService.datasubMenuInformeAsignacion(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);


  tableDataMaintainer: Array<any>;


 

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idhardware;
    this.vmP.idfk2 = elementoIndex.idhardware;



    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });
        break;
      default:
        break;
    }
  }

  preloadFull: boolean = false;
  getBuscar() {

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormHardware.get('empresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }




    const datePipe2 = new DatePipe('es');

    const fechainicio = datePipe2.transform(this.mantenedorFormHardware.get('fecha_desde')?.value, 'dd-MM-YYYY');
    const fechaFin = datePipe2.transform(this.mantenedorFormHardware.get('fecha_hasta')?.value, 'dd-MM-YYYY');

    if (this.mantenedorFormHardware.get('fecha_desde')?.value > this.mantenedorFormHardware.get('fecha_hasta')?.value) {
      this.snackbar.notify(
        'danger',
        'Error. La fecha DESDE debe ser menor o igual a la fecha HASTA'
      );
      this.preloadFull = false;
      return
    }
    if (fechaFin == null && fechainicio != null) {
      this.snackbar.notify(
        'danger',
        'Error seleccione fecha Hasta'
      );
      this.preloadFull = false;
      return
    }
    if (fechaFin != null && fechainicio == null) {
      this.snackbar.notify(
        'danger',
        'Error seleccione fecha Desde'
      );
      this.preloadFull = false;
      return
    }

    this.vmP.filtrosinformeInventario.idusuario = JSON.parse(localStorage.getItem("userInfo")).idusuario,
      this.vmP.filtrosinformeInventario.empresa = idempresa;
    // this.vmP.filtrosinformeInventario.estado = this.mantenedorFormHardware.get('estado')?.value ?? "0",
      this.vmP.filtrosinformeInventario.items = this.mantenedorFormHardware.get('items')?.value ?? 0,
      this.vmP.filtrosinformeInventario.bodega = this.mantenedorFormHardware.get('idbodega')?.value ?? 0,
      this.vmP.filtrosinformeInventario.busquedaActiva = true;
    this.vmP.filtrosinformeInventario.fechaDesde = fechainicio,
      this.vmP.filtrosinformeInventario.fechaHasta = fechaFin,

      this.preloadFull = true;

    this.getData();
  }

  dataresultado: any[] = [];
  getData() {




    this.hardwareService.informeinventario(this.vmP.filtrosinformeInventario).subscribe(
      (data) => {
        console.log(data)
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,


            estadojson: JSON.stringify([{ color: this.colorEstado(element.cestado), descolumn: this.desestadoHardware(element.cestado) }]),
            nombreUsuarioCompleto: element.nombreUsuario + ' ' + element.primerapellido,
            desestado: this.desestadoHardware(element.cestado),
            estadojsonBodega: JSON.stringify([{ cestado: element.estadoBodega, descestado: element.estadoBodega === 'V' ? 'Activo' : 'Inactivo' }]),
            desestadoBodega: element.estadoBodega === 'V' ? 'Activo' : 'Inactivo',
          };
        }
        );
        this.preloadFull = false;
        this.dataresultado = this.tableDataMaintainer;
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }
  // <mat-option value="A">Asignado</mat-option>
  // <mat-option value="D">Disponible</mat-option>
  // <mat-option value="M">Mantención</mat-option>
  // <mat-option value="R">Reciclado</mat-option>

  desestadoHardware(estado: string): string {
    switch (estado) {
      case 'A':
        return 'Asignado';
      case 'D':
        return 'Disponible';
      case 'M':
        return 'Mantención';
      case 'R':
        return 'Reciclado';
      default:
        return '';
    }
  }
  colorEstado(estado: string): string {
    switch (estado) {
      case 'A':
        return 'bg-secondary';
      case 'D':
        return 'bg-success';
      case 'M':
        return 'bg-warning';
      case 'R':
        return 'bg-danger';
      default:
        return '';
    }
  }


  dataitems: any[] = [];
  getdataitems() {
    this.itemsService.getall().subscribe(
      (data) => {
        this.dataitems = data


      },
      (err) => {
        this.dataitems = [];
      }
    );
  }


  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }


  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  exportToExcel() {
    this.preloadFull = true;
    if(this.dataresultado.length>0){
      this.excel(this.dataresultado);
    }else{
      this.snackbar.notify(
        'danger',
        'No hay datos para exportar'
      );
      this.preloadFull = false;
    }
  }

  excel(data: any) {
    let newDataXLS: any;
    if(this.check_tipo == 1){
        newDataXLS = data.map((element) => {
        return {

       
          'Empresa': element.vdesempresa,
          'Ítems': element.desitems,
          'Marca': element.vmarca,
          'Modelo': element.vmodelo,
          'Número Parte': element.vnumerodeparte,
          'Número de Serie': element.vnumeroserie,
          'Fecha Ingreso': element.dfechaRegistro_string,
          'Fecha Mantención': element.dfechamantencion_string,
          'Observación': element.vobservacion,
          'Estado Hardware': element.desestado,
          'Bodega': element.vdesbodega,
          'Estado Bodega': element.desestadoBodega,
          'Encargado': element.vnombreencargado,
        };
          
      });
    }else{
      newDataXLS = data.map((element) => {
      return {
        
        'Ítems': element.desitems,
          'Marca': element.vmarca,
          'Modelo': element.vmodelo,
          'Número Parte': element.vnumerodeparte,
          'Número de Serie': element.vnumeroserie,
          'Fecha Ingreso': element.dfechaRegistro_string,
          'Fecha Mantención': element.dfechamantencion_string,
          'Observación': element.vobservacion,
          'Estado Hardware': element.desestado,
          'Bodega': element.vdesbodega,
          'Estado Bodega': element.desestadoBodega,
          'Encargado': element.vnombreencargado,
      };
        
    });
  }
    this.exportxlsService.exportToExcel(
      newDataXLS,
      'Informe Control Inventario'
    )
    this.snackbar.notify(
      'success',
      'Archivo Generado, favor verificar su carpeta de descargas'
    );
      this.preloadFull = false;

     
  
  }


  databodegas: any[] = [];
  cargaBodega() {

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorFormHardware.get('empresa')?.value;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }

    this.bodegasempresaService.getbodegasbyempresa(idempresa).subscribe(
      (data) => {
        this.databodegas = data.filter((item: any) => item.cestado == 'V');
        this.selectedbodegas = this.databodegas;
        console.log(this.databodegas);
      },
      (err) => {
        this.databodegas = [];
      }
    );
  }

  selectedbodegas: any = [];

  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedbodegas = result;
  }


  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.databodegas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }








}
