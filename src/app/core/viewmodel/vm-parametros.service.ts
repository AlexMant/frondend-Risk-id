import { Injectable } from '@angular/core';
import { detalle_solicitud_usuario, solicitud_usuario } from '../interfaces/solicitudcotizacion.model';
@Injectable({
  providedIn: 'root',
})
export class VmParametrosService {
  constructor() { }
  id: any;
  id2: any;
  id3: any;
  id4: any;
  id5: any;
  id6: any;
  idfk: any;
  idfk2: any;
  idfk3: any;
  idfk4: any;
  idfk5: any;
  des1: any;
  des2: any;
  des3: any;
  des4: any;
  des5: any;
  des6: any;
  solicitudEditable: any;

  filtrosardware = {
    idusuario: null,
    empresa: null,
    estado: null,
    items: null,
    busquedaActiva: false,
  }
  filtrosinformeasignacion = {
    idusuario: null,
    empresa: null,
    estado: null,
    items: null,
    fechaDesde: null,
    fechaHasta: null,
    busquedaActiva: false,
  }
  filtrosinformeInventario = {
    idusuario: null,
    empresa: null,
    estado: null,
    items: null,
    bodega: null,
    fechaDesde: null,
    fechaHasta: null,
    busquedaActiva: false,
  }
  filtrosusuarioform = {
    idusuario: null,
    empresa: null,
    tipoUsuario: null,
    mailusuario: null,
    busquedaActiva: false,
  }


  modeloUserUsuario: solicitud_usuario = {
    idusuariogenerador: null,
    idempresa: null,
    estado: null,
    tiposolicitud: null,
    observacion: null,
    iddireccion: null,
    detalle_solicitud_usuario: null
  }

  detallaherdsolicitud: detalle_solicitud_usuario[] = [];

  filtrosusuarioSolicitudadmin = {
    idusuario: null,
    idempresa: null,
    tiposolicitud: null,
    idestado: null,
    busquedaActiva: false,
    mailusuario: null,
  }

  filtroliscotizacion = {
    idusuario: null,
    idempresa: null,
    tiposolicitud: null,
    idestado: null,
    busquedaActiva: false,
    mailusuario: null,
  }


  documentosSolicitud: any = [];

  dataincidentetablavep: any = [];


  dataconcuencias: any = [];
  dataprobabilidades: any = [];
  datamagnitudes: any = [];

}
