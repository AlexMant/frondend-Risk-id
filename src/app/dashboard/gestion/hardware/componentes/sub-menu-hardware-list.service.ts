import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuhardwreListService {

  constructor() { }

  menuhardwre: Array<ActionInterface> = [];
  tableHeadColumnashardwre: Array<TableHeadInterface> = [];
  public datasubMenuHardware(check_admin: any): Array<ActionInterface> {
    // check_admin



    if (check_admin == 1) {

      this.menuhardwre = [
        {
          icon: 'edit',
          label: 'Editar/Ver',
          event: 'edit',
          tooltip: '',
        },
        {
          icon: 'history',
          label: 'Historial',
          event: 'hist',
          tooltip: '',
        },  
        {
          icon: 'person_add',
          label: 'Devolver',
          event: 'mant',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'mant',
        },   
        {
          icon: 'engineering',
          label: 'A Mantención',
          event: 'irmant',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'irmant',
        },   
        {
          icon: 'person_remove',
          label: 'Desasignar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'desac',
        },    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'activ',
        },
        {
          icon: 'person_add',
          label: 'Asigar',
          event: 'asigna',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'asigna',
        },
        {
          icon: 'recycling',
          label: 'Recilar',
          event: 'recic',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'recic',
        },
      
      ];

    } else {

      this.menuhardwre = [
        {
          icon: 'edit',
          label: 'Editar/Ver',
          event: 'edit',
          tooltip: '',
        },
        {
          icon: 'history',
          label: 'Historial',
          event: 'hist',
          tooltip: '',
        },  
        {
          icon: 'person_add',
          label: 'Devolver',
          event: 'mant',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'mant',
        },   
        {
          icon: 'engineering',
          label: 'A Mantención',
          event: 'irmant',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'irmant',
        },   
        {
          icon: 'person_remove',
          label: 'Desasignar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'desac',
        },    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'activ',
        },
        {
          icon: 'person_add',
          label: 'Asigar',
          event: 'asigna',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'asigna',
        },
        {
          icon: 'recycling',
          label: 'Recilar',
          event: 'recic',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'recic',
        },


      ];

    }

    return this.menuhardwre;

  }

  public dataColumnhardwre(check_admin: any): Array<TableHeadInterface> {

    if (check_admin == 1) {

      this.tableHeadColumnashardwre = [
        { name: 'idhardware', label: '#' }, 
        { name: 'desitems', label: 'Ítems' }, 
        { name: 'vnombreEmpresa', label: 'Empresa' }, 
        { name: 'vdesbodega', label: 'Bodega' }, 
        { name: 'vmarca', label: 'Marca' }, 
        { name: 'vmodelo', label: 'Modelo' }, 
        { name: 'vnumerodeparte', label: 'Número Parte' }, 
        { name: 'vnumeroserie', label: 'Número de Serie' }, 
        { name: 'dfechaRegistro_string', label: 'Fecha Ingreso'  , wrap: 0  }, 
        { name: 'dfechamantencion_string', label: 'Fecha Mantención' , wrap: 0  }, 
        // { name: 'vobservacion', label: 'vobservacion' }, 
        // { name: 'desestado', label: 'Estado' },
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
        { name: 'nombreUsuario', label: 'Asignado' }, 
       
      ];

    } else {

      this.tableHeadColumnashardwre = [
        { name: 'idhardware', label: '#' }, 
        { name: 'desitems', label: 'Ítems' }, 
        // { name: 'vnombreEmpresa', label: 'Empresa' }, 
        { name: 'vdesbodega', label: 'Bodega' }, 
        { name: 'vmarca', label: 'Marca' }, 
        { name: 'vmodelo', label: 'Modelo' }, 
        { name: 'vnumerodeparte', label: 'Número Parte' }, 
        { name: 'vnumeroserie', label: 'Número de Serie' }, 
        { name: 'dfechaRegistro_string', label: 'Fecha Ingreso'  , wrap: 0  }, 
        { name: 'dfechamantencion_string', label: 'Fecha Mantención' , wrap: 0  }, 
        // { name: 'vobservacion', label: 'vobservacion' }, 
        // { name: 'desestado', label: 'Estado' },
        { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
        { name: 'nombreUsuario', label: 'Asignado' },
      ];

    }

    return this.tableHeadColumnashardwre;
  }

}
