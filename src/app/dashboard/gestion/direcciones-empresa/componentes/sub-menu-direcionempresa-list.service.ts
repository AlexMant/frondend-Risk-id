import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuDireccionEmpresaService {

  constructor() { }

    menuDireccionEmpresa: Array<ActionInterface> = [];
    tableHeadColumnasDireccionEmpresa: Array<TableHeadInterface> = [];
  public datasubMenuDireccionEmpresa(check_admin:any): Array<ActionInterface>{
    // check_admin

    
    
    if(check_admin==1)
    {

      this.menuDireccionEmpresa = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
        },
      ];

    }else{

      this.menuDireccionEmpresa = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
        },
    
        
      ];

    }

      return this.menuDireccionEmpresa;

  }

  public dataColumnsDireccionEmpresa(check_admin:any):  Array<TableHeadInterface>{

    if(check_admin==1)
    {
        this.tableHeadColumnasDireccionEmpresa = [
          { name: 'ididreccion', label: '#' }, 
          { name: 'desdireccion', label: 'Dirección' }, 
          { name: 'vdepartamento', label: 'Departamento / Oficina' }, 
          // { name: 'latitud', label: 'latitud' }, 
          // { name: 'longitud', label: 'longitud' }, 
          // { name: 'nro_casa', label: 'nro_casa' }, 
          { name: 'referencia', label: 'Referencia' }, 
          { name: 'descomuna', label: 'Comuna' }, 
          { name: 'destipodireccion', label: 'Tipo Dirección' }, 
         
         
      
        ];
    }else{

      this.tableHeadColumnasDireccionEmpresa =   [
        { name: 'ididreccion', label: '#' }, 
        { name: 'desdireccion', label: 'Dirección' }, 
        { name: 'vdepartamento', label: 'Departamento / Oficina' }, 
        // { name: 'latitud', label: 'latitud' }, 
        // { name: 'longitud', label: 'longitud' }, 
        // { name: 'nro_casa', label: 'nro_casa' }, 
        { name: 'referencia', label: 'Referencia' }, 
        { name: 'descomuna', label: 'Comuna' }, 
        { name: 'destipodireccion', label: 'Tipo Dirección' }, 
    
      ];

    }

    return this.tableHeadColumnasDireccionEmpresa;
  }

}
