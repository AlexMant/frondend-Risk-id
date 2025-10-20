import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenubodegasEmpresaService {

  constructor() { }

    menuBodegaEmpresa: Array<ActionInterface> = [];
    tableHeadColumnasBodegaEmpresa: Array<TableHeadInterface> = [];
  public datasubMenuEmpresa(check_admin:any): Array<ActionInterface>{
    // check_admin

    
    
    if(check_admin==1)
    {

      this.menuBodegaEmpresa = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
        },
      ];

    }else{

      this.menuBodegaEmpresa = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
        },
    
        
      ];

    }

      return this.menuBodegaEmpresa;

  }

  public dataColumnsBodegaEmpresa(check_admin:any):  Array<TableHeadInterface>{

    if(check_admin==1)
    {
        this.tableHeadColumnasBodegaEmpresa = [
          { name: 'idbodegas_empresa', label: '#' },
          { name: 'vdesbodega', label: 'Nombre' },
          { name: 'vnombreencargado', label: 'Encargado' },
          { name: 'vdireccionbodega', label: 'Dirección' },
          { name: 'horarios', label: 'Horarios' },
          { name: 'vtelefonobodega', label: 'Teléfonno' },
          { name: 'vmailbodega', label: 'E-mail' },
          // { name: 'vobservacionbodega', label: 'vobservacionbodega' }, 
          // { name: 'vacapacidad', label: 'vacapacidad' }, 
          // { name: 'descestado', label: 'Estado' }, 
         
         
      
        ];
    }else{

      this.tableHeadColumnasBodegaEmpresa =   [
        { name: 'idbodegas_empresa', label: '#' },
    { name: 'vdesbodega', label: 'Nombre' },
    { name: 'vnombreencargado', label: 'Encargado' },
    { name: 'vdireccionbodega', label: 'Dirección' },
    { name: 'horarios', label: 'Horarios' },
    { name: 'vtelefonobodega', label: 'Teléfonno' },
    { name: 'vmailbodega', label: 'E-mail' },
    // { name: 'vobservacionbodega', label: 'vobservacionbodega' }, 
    // { name: 'vacapacidad', label: 'vacapacidad' }, 
    // { name: 'descestado', label: 'Estado' }, 
       
       
    
      ];

    }

    return this.tableHeadColumnasBodegaEmpresa;
  }

}
