import { Injectable } from '@angular/core';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';

@Injectable({
  providedIn: 'root'
})
export class SubMenuUsuarioListService {

  constructor() { }

  menuUsuario: Array<ActionInterface> = [];
  tableHeadColumnasUsuario: Array<TableHeadInterface> = [];
  public datasubMenuUsuario(check_admin: any): Array<ActionInterface> {
    // check_admin



    // if (check_admin == 1) {

      this.menuUsuario = [
        {
          icon: 'edit',
          label: 'Editar',
          event: 'edit',
          tooltip: '',
        },
        {
          icon: 'library_add',
          label: 'Asignaciones',
          event: 'addh',
          tooltip: '',
           
        } ,
        {
          icon: 'remove_circle_outline',
          label: 'Desactivar',
          event: 'desac',
          tooltip: '',
          condition: true,
          contains: 'N',
          data: 'estado',
        },


        {
          icon: 'task_alt',
          label: 'Activar',
          event: 'activ',
          tooltip: '',
          condition: true,
          contains: 'V',
          data: 'estado',
        },
      ];

    // } else {

    //   this.menuUsuario = [
    //     {
    //       icon: 'edit',
    //       label: 'Editar',
    //       event: 'edit',
    //       tooltip: '',
    //     },
    //     {
    //       icon: 'library_add',
    //       label: 'Asignaciones', 
    //       event: 'addh',
    //       tooltip: '',
           
    //     },
        
    //     {
    //       icon: 'remove_circle_outline',
    //       label: 'Desactivar',
    //       event: 'desac',
    //       tooltip: '',
    //       condition: true,
    //       contains: 'N',
    //       data: 'estado',
    //     },


    //     {
    //       icon: 'task_alt',
    //       label: 'Activar',
    //       event: 'activ',
    //       tooltip: '',
    //       condition: true,
    //       contains: 'V',
    //       data: 'estado',
    //     },



    //   ];

    // }

    return this.menuUsuario;

  }

  public dataColumnsUsuario(check_admin: any): Array<TableHeadInterface> {

    // if (check_admin == 1) {

    //   this.tableHeadColumnasUsuario = [
    //     { name: 'idusuario', label: '#' },
    //     { name: 'mail', label: 'E-mail' },
    //     { name: 'nombreUsuario', label: 'Nombre' },
    //     { name: 'primerapellido', label: 'Apellido Paterno' },
    //     { name: 'segundoapellido', label: 'Apellido Materno' },
    //     { name: 'formatrut', label: 'RUT' },
    //     { name: 'telefonocompleto', label: 'Teléfono ',event: 'wasa',  wrap: 0,  },
    //     { name: 'vnombreEmpresa', label: 'Empresa' },
    //     { name: 'destipousuario', label: 'Tipo Usuario' },
    //     // { name: 'desestado', label: 'Estado' },
    //     { name: 'estadojson', label: 'Estado', type: 'jsonarray', colsNames: ['cestado', 'descestado'], wrap: 1 },
    //   ];

    // } else {

      this.tableHeadColumnasUsuario = [
        { name: 'idgen_usuarios', label: '#' },
        { name: 'email_usuario', label: 'E-mail' },
        { name: 'nombre_usuarios', label: 'Nombre' },
       { name: 'rut', label: 'RUT' },
        { name: 'telefono_usuarios', label: 'Teléfono ',event: 'wasa',  wrap: 0,  },
      
      ];

    // }

    return this.tableHeadColumnasUsuario;
  }

}
