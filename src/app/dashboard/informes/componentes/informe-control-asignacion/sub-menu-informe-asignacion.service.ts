import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuInformeAsignacionService {

  constructor() { }

  menuInformeAsignacion: Array<ActionInterface> = [];
  tableHeadColumnasInformeAsignacion: Array<TableHeadInterface> = [];
  public datasubMenuInformeAsignacion(check_admin: any): Array<ActionInterface> {

      this.menuInformeAsignacion = [
       
      ];
  
    return this.menuInformeAsignacion;

  }

  public dataColumnsInformeAsignacion(check_admin: any): Array<TableHeadInterface> {

    if (check_admin == 1) {

      this.tableHeadColumnasInformeAsignacion = [
        // { name: 'usuarioAsignado', label: '#' },
        { name: 'mail', label: 'E-mail' },
        { name: 'nombreUsuarioCompleto', label: 'Usuario' , wrap: 0  },
        { name: 'varea', label: 'Área' , wrap: 0 },
        { name: 'vcargo', label: 'Cargo' , wrap: 0 },
        { name: 'dfechaasignacion_string', label: 'Fecha Asignación' },
       
        { name: 'desitems', label: 'Ítems', wrap: 0  },
        { name: 'vnombreEmpresa', label: 'Empresa', wrap: 0  },
        { name: 'vmarca', label: 'Marca', wrap: 0  },
        { name: 'vmodelo', label: 'Modelo' , wrap: 0 },
        { name: 'vnumerodeparte', label: 'Número Parte' , wrap: 0 },
        { name: 'vnumeroserie', label: 'Número de Serie', wrap: 0  },
        { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
        { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
     
      ];

    } else {

      this.tableHeadColumnasInformeAsignacion = [
        // { name: 'usuarioAsignado', label: '#' },
        { name: 'mail', label: 'E-mail' },
        { name: 'nombreUsuarioCompleto', label: 'Usuario' , wrap: 0 },
        { name: 'varea', label: 'Área', wrap: 0  },
        { name: 'vcargo', label: 'Cargo' , wrap: 0 },
        { name: 'dfechaasignacion_string', label: 'Fecha Asignación' },
       
        { name: 'desitems', label: 'Ítems', wrap: 0  },
        // { name: 'vnombreEmpresa', label: 'Empresa' },
        { name: 'vmarca', label: 'Marca' , wrap: 0 },
        { name: 'vmodelo', label: 'Modelo', wrap: 0  },
        { name: 'vnumerodeparte', label: 'Número Parte' , wrap: 0 },
        { name: 'vnumeroserie', label: 'Número de Serie', wrap: 0  },
        { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
        { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
      ];

    }

    return this.tableHeadColumnasInformeAsignacion;
  }

}
