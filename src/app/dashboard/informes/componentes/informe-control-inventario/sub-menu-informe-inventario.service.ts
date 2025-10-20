import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuInformeInventarioService {

  constructor() { }

  menuInformeInventario: Array<ActionInterface> = [];
  tableHeadColumnasInformeInventario: Array<TableHeadInterface> = [];
  public datasubMenuInformeAsignacion(check_admin: any): Array<ActionInterface> {

      this.menuInformeInventario = [
       
      ];
  
    return this.menuInformeInventario;

  }

  public dataColumnsInformeInventario(check_admin: any): Array<TableHeadInterface> {

    if (check_admin == 1) {

      this.tableHeadColumnasInformeInventario = [
        // { name: 'usuarioAsignado', label: '#' },
        
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

               { name: 'vdesbodega', label: 'Bodega', wrap: 0 },
        { name: 'estadojsonBodega', label: 'Estado Bodega',type: 'jsonarray',  colsNames: ['cestado', 'descestado'], wrap: 1 },
        { name: 'vnombreencargado', label: 'Encargado', wrap: 0 },
     
      ];

    } else {

      this.tableHeadColumnasInformeInventario = [
        { name: 'desitems', label: 'Ítems', wrap: 0  },
        // { name: 'vnombreEmpresa', label: 'Empresa', wrap: 0  },
        { name: 'vmarca', label: 'Marca', wrap: 0  },
        { name: 'vmodelo', label: 'Modelo' , wrap: 0 },
        { name: 'vnumerodeparte', label: 'Número Parte' , wrap: 0 },
        { name: 'vnumeroserie', label: 'Número de Serie', wrap: 0  },
        { name: 'dfechaRegistro_string', label: 'Fecha Ingreso', wrap: 0 },
        { name: 'dfechamantencion_string', label: 'Fecha Mantención', wrap: 0 },
        { name: 'vobservacion', label: 'Observación', wrap: 0 },
        { name: 'estadojson', label: 'Estado Hardware', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },

       

        { name: 'vdesbodega', label: 'Bodega', wrap: 0 },
        { name: 'estadojsonBodega', label: 'Estado Bodega', type: 'jsonarray',  colsNames: ['cestado', 'descestado'], wrap: 1 },
        { name: 'vnombreencargado', label: 'Encargado', wrap: 0 },
      ];

    }

    return this.tableHeadColumnasInformeInventario;
  }

}
