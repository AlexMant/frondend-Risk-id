import { Component, OnInit } from '@angular/core';
import { TableHeadInterface } from '../../core/interfaces/tableHead.model';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html'
})
export class FormularioModalComponent implements OnInit {

  constructor() { }

  client: boolean = false;

  headTableClient: Array<TableHeadInterface> = [
    { name: 'name_contact', label: 'Nombre contacto' },
    { name: 'email', label: 'Email' },
    { name: 'rut', label: 'RUT' },
    { name: 'telefono', label: 'N° Telefónico' },
    { name: 'cargo', label: 'Cargo' }
  ];
  dataTableClient: Array<any> = [
    {
      name_contact: 'Rosalyn',
      email: 'rjusto@itps.cl',
      rut: '11.111.111-1',
      telefono: '+5691111111',
      cargo: 'Representante legal'
    }
  ];

  ngOnInit(): void { }

  alert(e) {
    console.log(e);
    alert(e);
  }

}
