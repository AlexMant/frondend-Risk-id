import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-incidentes-add',
  templateUrl: './incidentes-add.component.html',
  styleUrls: ['./incidentes-add.component.css']
})
export class IncidentesAddComponent implements OnInit {
  constructor(
    private IncidentesService: IncidentesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = {
    nombre: '',
    origen:'I',
    estado: '',
    riesgoId: 0,
    ubicacionId: 0,
    centroTrabajoId: 0,
    empresaId: 0,
    peligroAdicionalId: 0,
    procesoId: 0,
    subProcesoId: 0,
    rutina: '',
    areaId: 0,
    factoresRiesgoIds: [],
    peligrosIds: [],
    id: 0,
    tareaId: 0,
    caracterizaciones: [
      {
        cargoPersonalId: 0,
        cargoPersonalNombre: '',
        caracterizacionPersonalId: 0,
        cantidadPersonal: 0,
        danosProbables: [''],
        id: 0,
        medidasDeControl: [
          {
            nombre: '',
            observaciones_desaprobacion: '',
            actividadControlIds: [ ],
            actividadesControlResponsable: [{
              actividadControlId: 0,
              responsableId: ''
            }],
            usuarioRevId: 0,
            usuarioCreId: 0,
            usuarioAprId: 0,
            usuarioSupId: 0,
            factorRiesgoId: 0,
            id: 0
          }
        ],
        evaluacion: [
          {
              consecuenciaRPuroId:  0,
              consecuenciaRResidualId: 0,
              esSistema: false,
              incidenteCaracterizadoId: 0,
              magnitudRPuroId: 0,
              magnitudRResidualId: 0,
              probabilidadRPuroId: 0,
              probabilidadRResidualId: 0,

          }
        ]
      }
    ],
    esta_activo: true
  };
  ngOnInit(): void {}

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log('guardar');
    this.IncidentesService.post(this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
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
}
