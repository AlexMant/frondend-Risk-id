import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuDireccionUsuarioService {

  constructor() { }

    menuDireccionUsuario: Array<ActionInterface> = [];
    tableHeadColumnasDireccionUsuario: Array<TableHeadInterface> = [];
  public datasubMenuDireccionUsuario(check_admin:any): Array<ActionInterface>{
    // check_admin

    
    
    if(check_admin==1)
    {

      this.menuDireccionUsuario = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
          condition: true,
          contains: 'N',
          data: 'elimadir',
        },
      ];

    }else{

      this.menuDireccionUsuario = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
          condition: true,
          contains: 'N',
          data: 'elimadir',
        },
        
      ];

    }

      return this.menuDireccionUsuario;

  }

  public dataColumnsDireccionUsuario(check_admin:any):  Array<TableHeadInterface>{

    if(check_admin==1)
    {
        this.tableHeadColumnasDireccionUsuario = [
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

      this.tableHeadColumnasDireccionUsuario =   [
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

    return this.tableHeadColumnasDireccionUsuario;
  }

}
