import { Component, OnInit } from '@angular/core';
import { ActionInterface } from '../core/interfaces/action.model';
import { MatDialog } from '@angular/material/dialog';
import { FormularioModalComponent } from '../modals/formulario-modal/formulario-modal.component';
import { UploadModalComponent } from '../modals/upload-modal/upload-modal.component';
import { TableHeadInterface } from '../core/interfaces/tableHead.model';
import { NotificationService } from '../core/services/notification.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService) { }

  icons: Array<any> = [
    { icon: 'refresh', tooltip: 'Refrescar', event: 'reload' },
    { icon: 'chair', tooltip: 'Silla', event: 'chair' }
  ];

  // Mantenedor
  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'cod', label: 'Código', type: 'number', decimals: 0, prefix: '', orientacion: 'L' },
    { name: 'fecha', label: 'Fecha', type: 'date', format: 'DD/MM/YYYY', orientacion: 'C' },
    { name: 'email', label: 'Email', event: 'edit', orientacion: 'R' },
    { name: 'perfil', label: 'Perfil' },
    { name: 'rt', label: 'RT' },
    { name: 'estado', label: 'Estado' }
  ];
  tableDataMaintainer: Array<any> = [
    {
      cod: 5000,
      fecha: '2022-05-23T12:00:00Z',
      email: 'acarcasson1@itps.cl',
      perfil: 'Administrador',
      rt: 'NO',
      estado: 'Estado'
    },
    {
      cod: 50000,
      fecha: '2022-09-01T12:00:00Z',
      email: 'acarcasson2@itps.cl',
      perfil: 'Administrador',
      rt: 'SI',
      estado: 'Estado'
    },
    {
      cod: 325000,
      fecha: '2022-07-25T12:00:00Z',
      email: 'acarcasson3@itps.cl',
      perfil: 'Administrador',
      rt: 'SI',
      estado: 'Estado'
    }
  ]
  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'edit',
      label: 'Editar',
      event: 'edit',
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      condition: true,
      contains: 'acarcasson1',
      data: 'email',
    },
    {
      icon: 'score',
      label: 'Competencia calificación',
      event: 'score',
      tooltip: ''
    },
    {
      icon: 'person_off',
      label: 'Desactivar usuario',
      event: 'deactivate_user',
      tooltip: ''
    }
  ];
  maintainer: boolean = true;
  maintainerAdd: boolean = false;
  // Mantenedor

  tableHead: Array<TableHeadInterface> = [
    { name: 'nOferta', label: 'N° Oferta' },
    { name: 'detaleNorma', label: 'Detalle norma' },
    { name: 'alertas', label: 'Alertas' },
    { name: 'expediente', label: 'Expediente' },
    { name: 'inicio', label: 'Inicio' },
    { name: 'cliente', label: 'Cliente' },
    { name: 'operadores', label: 'Operadores' },
    { name: 'alcance', label: 'Alcance' },
    { name: 'servicio', label: 'Servicio' },
    { name: 'ultimaEstacion', label: 'Última estación' },
    { name: 'fSolicitud', label: 'F. Solicitud' },
    { name: 'fUltimaAccion', label: 'F. Últ. Acción' }
  ];

  tableData: Array<any> = [
    {
      nOferta: '22-0001',
      detaleNorma: 'NCH 2728:2015(37)(A)',
      alertas: '106 Días',
      expediente: '22-0001',
      inicio: '02/09/2022',
      cliente: '86.475.108-3 Avatar Limitada',
      operadores: 'COM.CORELLANA',
      alcance: 'Prueba, nuevo alcance de prueba',
      servicio: 'OTEC',
      ultimaEstacion: `*Enviar carta de bienvenida *Reiniciar programación`,
      fSolicitud: '12/01/2019',
      fUltimaAccion: '05/09/2022'
    },
    {
      nOferta: '22-0002',
      detaleNorma: 'NCH 2728:2015(37)(A)',
      alertas: '106 Días',
      expediente: '22-0001',
      inicio: '02/09/2022',
      cliente: '86.475.108-3 Avatar Limitada',
      operadores: 'COM.CORELLANA',
      alcance: 'Prueba, nuevo alcance de prueba',
      servicio: 'OTEC',
      ultimaEstacion: `*Enviar carta de bienvenida *Reiniciar programación`,
      fSolicitud: '12/01/2019',
      fUltimaAccion: '05/09/2022'
    }
  ];

  actions: Array<ActionInterface> = [
    { icon: 'manage_history', label: 'Continuar proceso', event: 'continue', tooltip: '' },
    { icon: 'content_paste_search', label: 'Seguimiento', event: 'tracing', tooltip: '' },
    { icon: 'edit', label: 'Editar', event: 'edit', tooltip: '' },
    { icon: 'visibility', label: 'Ver', event: 'see', tooltip: '' },
    { icon: 'upload', label: 'Subir archivos', event: 'upload', tooltip: '' }
  ];

  indicators: Array<any> = [
    {
      norma: { val: 'M1-2728', success: false },
      codes: [
        { success: true, cod: 37 },
        { success: false, cod: 38 },
        { success: false, cod: 39 }
      ],
      workingDay: { val: 0, success: false },
      hours: { val1: 8, val2: 1.00, success: false, }
    }
  ];

  outputAction(e?: any) {
    console.log(e);

    switch (e.event) {
      case 'continue':
        this.dialog.open(FormularioModalComponent, {
          autoFocus: false,
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          panelClass: 'dialog-full-h'
        });
        break;
      case 'upload':
        this.dialog.open(UploadModalComponent, {
          autoFocus: false,
          width: '315px'
        });
        break;
      default:
        break;
    }
  }

  alert(action: any) {
    alert(action);
  }

  notify(type: string, message: string) {
    // this.snackbar.notify(type, message);
  }

  openModalConfirm(type: string, title: string, message: string, btnText: string, btnTextSecondary: string) {
    this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      width: '320px',
      data: {
        type,
        title,
        message,
        btnText,
        btnTextSecondary
      }
    }).afterClosed().subscribe(res => {
      res && alert(res);
    });
  }

  uploadFileModal() {
    this.dialog.open(UploadModalComponent, {
      autoFocus: false,
      width: '320px'
    });
  }

  openModalFormulario() {
    this.dialog.open(FormularioModalComponent, {
      autoFocus: false,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'dialog-full-h'
    });
  }


  preload: boolean = false;
  preloadFull: boolean = false;
  showPreloader(type?: string) {
    if (type == 'full') {
      this.preloadFull = true;
    } else {
      this.preload = true;
    }

    setTimeout(() => {
      this.preload = false;
      this.preloadFull = false;
    }, 2500);

  }

  ngOnInit(): void { }

}
