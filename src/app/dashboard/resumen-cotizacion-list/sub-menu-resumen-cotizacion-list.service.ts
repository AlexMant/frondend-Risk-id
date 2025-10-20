import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuResumencotizacionioListService {

  constructor() { }

  menuResumen: Array<ActionInterface> = [];
  tableHeadColumnasResumen: Array<TableHeadInterface> = [];
  public datasubMenuResumen(check_admin: any): Array<ActionInterface> {
    // check_admin





    this.menuResumen = [
      // {
      //   icon: 'edit',
      //   label: 'Editar',
      //   event: 'edit',
      //   tooltip: '',
      // },

    ];




    return this.menuResumen;

  }





  public dataColumnsResumen(check_admin: any): Array<TableHeadInterface> {

    if (check_admin == 1) {

      this.tableHeadColumnasResumen = [
        { name: 'idsolicictud', label: '#' },
        { name: 'vcodigosolicitud', label: 'Código Cotización' },
        { name: 'fecha_string', label: 'Fecha', wrap: 1 },
        { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'desdireccion', label: 'Dirección' },
       
        { name: 'nombreUsuarioGenerador', label: 'Usuario Solicitante', wrap: 1 },
        { name: 'vobservacion', label: 'Observación' },

        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
      ];

    } else {

      this.tableHeadColumnasResumen = [
        { name: 'idsolicictud', label: '#' },
        { name: 'vcodigosolicitud', label: 'Código Cotización' },
        { name: 'fecha_string', label: 'Fecha', wrap: 1 },
        // { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'desdireccion', label: 'Dirección' },
       
        { name: 'nombreUsuarioGenerador', label: 'Usuario Solicitante', wrap: 1 },
        { name: 'vobservacion', label: 'Observación' },

        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
      ];

    }

    return this.tableHeadColumnasResumen;
  }

}
