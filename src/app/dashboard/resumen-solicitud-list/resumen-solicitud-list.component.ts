import { Component, Input, OnInit } from '@angular/core';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { SubMenuResumenioListService } from './sub-menu-resumen-list.service';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
@Component({
  selector: 'app-resumen-solicitud-list',
  templateUrl: './resumen-solicitud-list.component.html',
  styleUrls: ['./resumen-solicitud-list.component.css']
})
export class ResumenSolicitudListComponent implements OnInit {
  @Input() tipoconsulta: string = 'S';
  constructor(
    private subMenuUsuarioListService: SubMenuResumenioListService
    , private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {

    console.log('tipoconsulta', this.tipoconsulta);
    this.getData();
  }

 
  tableDataMaintainer: Array<any>;
  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuUsuarioListService.dataColumnsResumen(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuUsuarioListService.datasubMenuResumen(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);


  
  getData() {
    let body = {};
    if(JSON.parse(localStorage.getItem("userInfo")).check_tipo == 1){
      body = {
        idusuario: 0,
        idempresa: 0,
        tiposolicitud: this.tipoconsulta,
        idestado: 0,
      }
    }
    if(JSON.parse(localStorage.getItem("userInfo")).check_tipo == 2){
      body = {
        idusuario: 0,
        idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa??'0'),
        tiposolicitud: this.tipoconsulta,
        idestado: 0,
      }
    }
    if(JSON.parse(localStorage.getItem("userInfo")).check_tipo == 3){
      body = {
        idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario),
        idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa??'0'),
        tiposolicitud: this.tipoconsulta,
        idestado: 0,
      }
    }
   


  


      console.log('consultaResumen',body)

    this.solicitudService.getconsultasolicitud(body).subscribe(
      (data) => {
        console.log(data)
        this.tableDataMaintainer = data.slice(0, 5).map((element) => {
          return {
            ...element,
          
          
            estadojson: JSON.stringify([{ color: this.colorEstado(element.idestado), descolumn: this.desestadoHardware(element.idestado) }]),
            nombreUsuarioGenerador: element.nombregenerador + ' ' + element.apellidogenerador,
            ctiposolictud: this.destipo(element.ctiposolictud),
          };
        }
        ); 
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  destipo(tipo: any): string {
    switch (tipo) {
      case 'M':
        return 'Mantención';
      case 'N':
        return 'Nuevo Hardware';
      case 'C':
        return 'Cotizacion';
      case '':
        return 'Sin Información';
      default:
        return '';
    }
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


}
