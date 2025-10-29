import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuListService {

  constructor() { }

    menuEmpresa: Array<ActionInterface> = [];
    tableHeadColumnasEmpresa: Array<TableHeadInterface> = [];
  public datasubMenuEmpresa(check_admin:any): Array<ActionInterface>{
    // check_admin

    
    
    if(check_admin==1)
    {

      this.menuEmpresa = [
        {
          icon: 'edit',
          label: 'Editar',
          event: 'edit',
          tooltip: '',
        },
    
        // {
        //   icon: 'delete',
        //   label: 'Eliminar',
        //   event: 'delete',
        //   tooltip: '',
        // },
        
        {
          icon: 'remove_circle_outline',
          label: 'Desactivar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'N',
          data: 'cestado',
        },
        
    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'V',
          data: 'cestado',
        },
      ];

    }else{

      this.menuEmpresa = [
        {
          icon: 'edit',
          label: 'Editar',
          event: 'edit',
          tooltip: '',
        },
        {
          icon: 'remove_circle_outline',
          label: 'Desactivar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'Inactiva',
          data: 'estado',
        },
        
    
        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'Activa',
          data: 'estado',
        },
    
        
      ];

    }

      return this.menuEmpresa;

  }

  public dataColumnsEmpresa(check_admin:any):  Array<TableHeadInterface>{

    // if(check_admin==1)
    // {
        this.tableHeadColumnasEmpresa = [
              { name: 'id', label: '#' },
          { name: 'codigo', label: 'Codigo' },
          { name: 'nombre', label: 'Nombre empresa' },
          { name: 'fecha_registro', label: 'Fecha de Registro' },
          { name: 'rut', label: 'RUT' },
          { name: 'observaciones', label: 'Observación' },
      
          
          { name: 'vTelefono', label: 'Telefono' },
          { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['descestado'], wrap: 1 },
         
         
      
        ];
    // }else{

    //   this.tableHeadColumnasEmpresa =   [
    //     { name: 'idempresa', label: '#' },
    //     { name: 'vnombreEmpresa', label: 'Nombre empresa' },
    //     { name: 'vRut_empresa', label: 'RUT' },
    //     { name: 'vMail', label: 'E-mail' },
    
    //     { name: 'vNombre_Responsable', label: 'Responsable' },
    //     { name: 'vTelefono', label: 'Telefono' },
    //     { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['cestado', 'descestado'], wrap: 1 },
       
       
    
    //   ];

    // }

    return this.tableHeadColumnasEmpresa;
  }

}
