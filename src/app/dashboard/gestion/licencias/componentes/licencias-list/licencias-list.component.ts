import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { LicenciasService } from 'src/app/core/services/licencias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-licencias-list',
  templateUrl: './licencias-list.component.html',
  styleUrls: ['./licencias-list.component.css'],
})
export class LicenciasListComponent implements OnInit {

  @ViewChild('licenciasFormRef') licenciasFormComponent: any;
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private licenciasService: LicenciasService
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'licenciaId', label: '#' },
    // { name: 'trabajadorId', label: 'Trabajador' },
    { name: 'flashNombre', label: 'Reporte Flash' },
    { name: 'fechaInicio', label: 'Fecha Inicio' },
    { name: 'fechaTermino', label: 'Fecha Término' },
    { name: 'tipolicenciaId', label: 'Tipo de Licencia' },
    { name: 'cantidadDias', label: 'Cantidad de Días' }

  ];

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    this.getData();
  }

  actionsMaintainer: Array<ActionInterface> = [
    // {
    //   icon: 'edit',
    //   label: 'Editar',
    //   event: 'edit',
    //   tooltip: '',
    // },

    {
      icon: 'delete',
      label: 'Eliminar',
      event: 'delete',
      tooltip: '',
    },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.id;




    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      case 'delete':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            width: '320px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea eliminar el registro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.licenciasService.delete(this.vmP.id).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro eliminado exitosamente'
                  );
                  this.getData();
                },
                (err) => {
                  console.log(err);
                  this.snackbar.notify(
                    'danger',
                    'Error al intentar actualizar el registro.'
                  );
                }
              );
            }
          });

        break;
      default:
        break;
    }
  }

  getData() {
    let params = '?trabajadorId=' + this.vmP.idfk;

    this.licenciasService.getbyparams(params).subscribe(
      (data) => {
        console.log('datalicencias', data.data);
        this.tableDataMaintainer = data.data.map((item: any) => {
          return {
            ...item,
            flashNombre: item.flashNombre ? item.flashNombre : 'Sin Flash Asociado',
            tipoLicenciaNombre: item.tipoLicencia ? item.tipoLicencia.nombre : '',
            cantidadDias: this.calcularDias(item.fechaInicio, item.fechaTermino),
            fechaInicio: new Date(item.fechaInicio).toLocaleDateString('es-ES'),
            fechaTermino: new Date(item.fechaTermino).toLocaleDateString('es-ES')
          };
        });

      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }


  //funcion para calcular la diferencia en días entre dos fechas
  calcularDias(fechaInicio: string, fechaTermino: string): number {
    const inicio = new Date(fechaInicio);
    const termino = new Date(fechaTermino);
    const diferencia = termino.getTime() - inicio.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24)) + 1; // +1 para incluir el día de inicio
    return dias;
  }
  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./../trabajadores'], {
      relativeTo: this.activatedRoute,
    });
  }

  modelo: any = {
    trabajadorId: null,
    flashId: null,
    fechaInicio: null,
    fechaTermino: null,
    tipoLicenciaId: null,
    file: null
    // archivos: [
    //   {
    //     originalName: null,
    //     mimetype: null,
    //     size: null,
    //     base64Data: null,
    //   }
    // ]
  };
  guardar() {

    const formData = new FormData();
    formData.append('trabajadorId', this.modelo.trabajadorId);

    if (this.modelo.flashId != null && this.modelo.flashId !== '' && this.modelo.flashId !== undefined) {
      formData.append('flashId', this.modelo.flashId);
    }


    formData.append('fechaInicio', this.modelo.fechaInicio);
    formData.append('fechaTermino', this.modelo.fechaTermino);
    if (this.modelo.tipoLicenciaId != null && this.modelo.tipoLicenciaId !== '' && this.modelo.tipoLicenciaId !== undefined) {
      formData.append('tipoLicenciaId', this.modelo.tipoLicenciaId);
    }
    if (this.modelo.file) {
      formData.append('file', this.modelo.file);
    }



    this.licenciasService.post(formData).subscribe(
      (data) => {
        console.log('data_guardar', data);
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.getData();
        this.modelo = {
          trabajadorId: null,
          flashId: null,
          fechaInicio: null,
          fechaTermino: null,
          tipoLicenciaId: null,
          file: null
        };
        this.limpiarformularioenform();
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );
  }

  // Ejemplo: función para ejecutar método del hijo
  limpiarformularioenform() {
    if (this.licenciasFormComponent && this.licenciasFormComponent.limpiarFormulario) {
      this.licenciasFormComponent.limpiarFormulario();
    }
  }

}
