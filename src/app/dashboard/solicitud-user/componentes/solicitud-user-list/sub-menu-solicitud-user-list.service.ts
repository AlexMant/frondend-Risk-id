import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuSolicitudUserListService {

  constructor() { }

  menusolicituduser: Array<ActionInterface> = [];
  tableHeadColumnassolicituduser: Array<TableHeadInterface> = [];
  public datasubMenuSolicituduser(check_admin: any): Array<ActionInterface> {
    // check_admin



    

      this.menusolicituduser = [
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

    return this.menusolicituduser;

  }

  public dataColumnSolicituduser(check_admin: any): Array<TableHeadInterface> {

 
      this.tableHeadColumnassolicituduser = [
        { name: 'idsolicictud', label: '#' },
        { name: 'vcodigosolicitud', label: 'Código Solicitud' , event: 'edit',  wrap: 0,  },
        { name: 'fecha_string', label: 'Fecha' },
        // { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'desiposolictud', label: 'Tipo', wrap: 0 },

        // { name: 'desusuariogenerador', label: 'desestado' },
       
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
       
       
       
      ];
 

    return this.tableHeadColumnassolicituduser;
  }

}
