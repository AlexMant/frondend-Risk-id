import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuDocumentoSolicitudListService {

  constructor() { }

  menuDocSolcitud: Array<ActionInterface> = [];
  tableHeadColumnasDocSolicitud: Array<TableHeadInterface> = [];
  public datasubMenuDocSolicitud(editable: any): Array<ActionInterface> {
    // check_admin



    if (editable == true) {

      this.menuDocSolcitud = [
        {
          icon: 'delete',
          label: 'Eliminar',
          event: 'delete',
          tooltip: '',
          condition: true,
          contains: 'NO',
          data: 'del',
        },
      
      ];

    } else {

      this.menuDocSolcitud = [
       


      ];

    }

    return this.menuDocSolcitud;

  }

  public dataColumnDocSolicitud(check_admin: any): Array<TableHeadInterface> {

 

      this.tableHeadColumnasDocSolicitud = [
        { name: 'iddocsolicitud', label: '#' },
        { name: 'nombre_doc', label: 'Documento' ,event: 'desc'},
        { name: 'fecha_registro', label: 'Fecha', type: 'date', format: 'DD/MM/YYYY' },
        { name: 'vobservaciondoc', label: 'Observación' },
       
      ];
 

    return this.tableHeadColumnasDocSolicitud;
  }

}
