import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OcurrenciasService } from 'src/app/core/services/ocurrencias.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
type EstadoArchivo = 'existente' | 'nuevo' | 'eliminado';
@Component({
  selector: 'app-flash-edit',
  templateUrl: './ocurrencias-edit.component.html',
  styleUrls: ['./ocurrencias-edit.component.css'],
})
export class OcurrenciasEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
      private readonly ocurrenciasService: OcurrenciasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.ocurrenciasService.getid(this.vmP.id).subscribe({
      next: (data) => {
        console.log("data.data", data.data);
        this.modelo = {
          id: null,
          nombre: null,
          descripcion: null,
          tipoOcurrenciaId: null,
          fechaOcurrencia: null,
          danoPotencialId: null,
          danoRealId: null,
          ubicacionId: null,
          lugarEspecifico: null,
          medidaInmediata: null,
          centroTrabajoId: null,
          tareaId: null,
          incidenteId: null,
          usuarioReportaId: null,
          file: []
        };
        this.modelo.id = data.data.id;
        this.modelo.nombre = data.data.nombre;
        this.modelo.descripcion = data.data.descripcion;
        this.modelo.tipoOcurrenciaId = data.data.tipoOcurrenciaId;
        this.modelo.fechaOcurrencia = data.data.fechaOcurrencia;
        this.modelo.danoPotencialId = data.data.danoPotencialId;
        this.modelo.danoRealId = data.data.danoRealId;
        this.modelo.ubicacionId = data.data.ubicacionId;
        this.modelo.lugarEspecifico = data.data.lugarEspecifico;
        this.modelo.medidaInmediata = data.data.medidaInmediata;
        this.modelo.centroTrabajoId = data.data.centroTrabajoId;
        this.modelo.tareaId = data.data.tareaId;
        this.modelo.incidenteId = data.data.incidenteId;
        this.modelo.usuarioReportaId = data.data.usuarioReportaId;
        this.modelo.file = data.data.archivos || [];





        console.log("modelo", this.modelo);

      },
      error: (err) => {
        this.modelo = {};
      }
    });
  }
  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {



    const formData = new FormData();
    formData.append('nombre', this.modelo.nombre);
    formData.append('descripcion', this.modelo.descripcion);
    formData.append('tipoFlashId', this.modelo.tipoFlashId);
    formData.append('fechaOcurrencia', this.modelo.fechaOcurrencia);
    formData.append('danoPotencialId', this.modelo.danoPotencialId);
    formData.append('danoRealId', this.modelo.danoRealId);
    formData.append('ubicacionId', this.modelo.ubicacionId);
    formData.append('lugarEspecifico', this.modelo.lugarEspecifico);
    formData.append('medidaInmediata', this.modelo.medidaInmediata);
    formData.append('centroTrabajoId', this.modelo.centroTrabajoId);
    formData.append('tareaId', this.modelo.tareaId);
    formData.append('incidenteId', this.modelo.incidenteId);
    formData.append('usuarioReportaId', this.modelo.usuarioReportaId);



    if (this.modelo.file.filter((f: { file: File, status: EstadoArchivo, id: number }) => f.status === 'eliminado').length > 0) {
      formData.append(`filesEliminar`, '0');
    }

    if (this.modelo.file && Array.isArray(this.modelo.file)) {
      this.modelo.file.forEach((file: { file: File, status: EstadoArchivo, id: number }, index: number) => {



        if (file.status === 'nuevo') {
          formData.append(`files`, file.file);
        } else if (file.status === 'eliminado') {
          formData.append(`filesEliminar`, file.id.toString());
        }
      });
    }

    const entries = (formData as any).entries();


    console.log('formData entries:');
    for (const pair of entries) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }


    console.log('modelo', this.modelo);

    this.ocurrenciasService.put(this.vmP.id, formData).subscribe({
      next: (data) => {
        this.snackbar.notify('success', 'Registro actualizado exitosamente');

      },
      error: (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar actualizar el registro.'
        );
      },
      complete: () => {
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
      }
    });
  }
}
