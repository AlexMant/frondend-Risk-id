import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuSolicitudAdminListService {

  constructor() { }

  menusolicitudadmin: Array<ActionInterface> = [];
  tableHeadColumnassolicitudadmin: Array<TableHeadInterface> = [];
  public datasubMenuSolicituduser(check_admin: any): Array<ActionInterface> {
    // check_admin



    

      this.menusolicitudadmin = [
        // {
        //   icon: 'edit',
        //   label: 'Editar/Ver',
        //   event: 'edit',
        //   tooltip: '',
        // },
        // {
        //   icon: 'history',
        //   label: 'Historial',
        //   event: 'hist',
        //   tooltip: '',
        // } 
      ];

    return this.menusolicitudadmin;

  }

  public dataColumnSolicitudadmin(check_admin: any): Array<TableHeadInterface> {

 
    
if (check_admin == 1) {

  this.tableHeadColumnassolicitudadmin = [
    { name: 'idsolicictud', label: '#' },
    { name: 'vcodigosolicitud', label: 'Código Solicitud' , event: 'edit',   },
    { name: 'vnombreEmpresa', label: 'Empresa', wrap: 1, },
    { name: 'nombreUsuarioGenerador', label: 'Usuario' },
    { name: 'fecha_string', label: 'Fecha' },
    
    { name: 'vobservacion', label: 'Observación', wrap: 0 },
    { name: 'desiposolictud', label: 'Tipo', wrap: 0 },

    
   
    { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
  ];

} else {

  this.tableHeadColumnassolicitudadmin = [
    { name: 'idsolicictud', label: '#' },
        { name: 'vcodigosolicitud', label: 'Código Solicitud' , event: 'edit',  wrap: 0,  },
        { name: 'nombreUsuarioGenerador', label: 'Usuario' },
        { name: 'fecha_string', label: 'Fecha' },
        // { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'desiposolictud', label: 'Tipo', wrap: 0 },
      
        // { name: 'desusuariogenerador', label: 'desestado' },
       
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
  ];

}
 

    return this.tableHeadColumnassolicitudadmin;
  }

}
