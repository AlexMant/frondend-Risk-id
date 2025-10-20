import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuResumenioListService {

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
        { name: 'vcodigosolicitud', label: 'Código Solicitud' },
        { name: 'fecha_string', label: 'Fecha' },
        { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'ctiposolictud', label: 'Tipo', wrap: 0 },

        { name: 'nombreUsuarioGenerador', label: 'Usuario Generador' },
      
         { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
      ];

    } else {

      if (check_admin == 2) {
        this.tableHeadColumnasResumen = [
          { name: 'idsolicictud', label: '#' },
          { name: 'vcodigosolicitud', label: 'Código Solicitud' },
          { name: 'fecha_string', label: 'Fecha' },
          { name: 'vobservacion', label: 'Observación', wrap: 0 },
          { name: 'ctiposolictud', label: 'Tipo', wrap: 0 },

          { name: 'nombreUsuarioGenerador', label: 'Usuario Generador' },
       
         { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
        ];
      } else {

        this.tableHeadColumnasResumen = [
          { name: 'idsolicictud', label: '#' },
          { name: 'vcodigosolicitud', label: 'Código Solicitud' },
          { name: 'fecha_string', label: 'Fecha' },
          // { name: 'vnombreEmpresa', label: 'Empresa' },
          { name: 'vobservacion', label: 'Observación', wrap: 0 },
          { name: 'ctiposolictud', label: 'Tipo', wrap: 0 },

          // { name: 'desusuariogenerador', label: 'desestado' },
         
          { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
        ];
      }

    }

    return this.tableHeadColumnasResumen;
  }

}
