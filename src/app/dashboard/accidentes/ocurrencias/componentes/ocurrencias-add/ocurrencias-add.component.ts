import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OcurrenciasService } from 'src/app/core/services/ocurrencias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
type EstadoArchivo = 'existente' | 'nuevo' | 'eliminado';
@Component({
  selector: 'app-ocurrencias-add',
  templateUrl: './ocurrencias-add.component.html',
  styleUrls: ['./ocurrencias-add.component.css'],
})
export class OcurrenciasAddComponent implements OnInit {
  constructor(
    private readonly ocurrenciasService: OcurrenciasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = {
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
    file: null,
    detalleOcurrencia: null,
        accion: 'I'

  };
  ngOnInit(): void { }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log('guardar');

    const formData = new FormData();
    formData.append('nombre', this.modelo.nombre);
    formData.append('descripcion', this.modelo.descripcion);
    formData.append('tipoOcurrenciaId', this.modelo.tipoOcurrenciaId);
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

    // formData.append('files', this.modelo.file);

    if (this.modelo.file && Array.isArray(this.modelo.file)) {
      this.modelo.file.forEach((file: { file: File, status: EstadoArchivo, id: number }, index: number) => {
        if (file.status === 'nuevo') {
          formData.append(`files`, file.file);
        }
      });
    }
    if (this.modelo.detalleOcurrencia && Array.isArray(this.modelo.detalleOcurrencia)) {
      
       formData.append('personasInvolucradas', JSON.stringify(this.modelo.detalleOcurrencia));
    
    }

    const entries = (formData as any).entries();


    console.log('formData entries:');
    for (const pair of entries) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }


    console.log('modelo', this.modelo);

    this.ocurrenciasService.post(formData).subscribe(
      (data) => {

        this.snackbar.notify('success', 'Registro agregado exitosamente');
        // this.router.navigate(['./..'], {
        //   relativeTo: this.activatedRoute,
        // }); 

      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );

    this.ocurrenciasService.PostData(formData).subscribe({
      next: (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
      },
      error: (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      },
    });
  }
}