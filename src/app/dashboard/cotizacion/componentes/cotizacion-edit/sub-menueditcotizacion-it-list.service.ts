import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenueditCotizacionItListService {

  constructor() { }

  menusmenucotizacionadminEdit: Array<ActionInterface> = [];
  tableHeadColumnascotizacionadminEdit: Array<TableHeadInterface> = [];
  public datasubMenuEditSolicituduser(check_admin: any): Array<ActionInterface> {
    // check_admin



    

      this.menusmenucotizacionadminEdit = [
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

    return this.menusmenucotizacionadminEdit;

  }

  public dataColumnEditSolicituduser(chetipo: any): Array<TableHeadInterface> {

//  console.log(">>>>>>>>>",chetipo);
    // if(chetipo == 'M'){
    //   this.tableHeadColumnascotizacionadminEdit = [
    //     { name: 'idhardware', label: '#' }, 
    //     { name: 'desitems', label: 'Ítems' }, 
    //     { name: 'vmarca', label: 'Marca' }, 
    //     { name: 'vmodelo', label: 'Modelo' }, 
    //     { name: 'vnumeroserie', label: 'N° Serie' }, 
    //     { name: 'vnumerodeparte', label: 'N° Parte' }, 
    //     // { name: 'cantidad', label: 'Cantidad' }, 
    //     { name: 'vobservacion', label: 'Observación' }
       
       
    //   ];
    // }else{
      this.tableHeadColumnascotizacionadminEdit = [
        // { name: 'idhardware', label: '#' }, 
        { name: 'desitems', label: 'Ítems' }, 
        { name: 'vmarca', label: 'Marca' }, 
        { name: 'vmodelo', label: 'Modelo' }, 
        { name: 'cantidad', label: 'Cantidad' }, 
        { name: 'vobservacion', label: 'Observación' }
       
       
      ];

    // }
 

    return this.tableHeadColumnascotizacionadminEdit;
  }

}
