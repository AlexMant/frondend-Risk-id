import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-incidentes-edit',
  templateUrl: './incidentes-edit.component.html',
  styleUrls: ['./incidentes-edit.component.css']
})
export class IncidentesEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private IncidentesService: IncidentesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

ngOnInit(): void {
  this.IncidentesService.getid(this.vmP.id).subscribe(
    (data) => {
      console.log("data incidente edit", data);
      const incidente = data.data || {};
      this.modelo = {
          id: incidente.id || 0,
           origen:'E',
        nombre: incidente.nombre || '',
        estado: incidente.estado || '',
        riesgoId: incidente.riesgoId || 0,
        centroTrabajoId: incidente.centroTrabajoId || 0,
        procesoId: incidente.procesoId || 0,
        subProcesoId: incidente.subProcesoId || 0,
        ubicacionId: incidente.ubicacionId || 0,
        peligroAdicionalId: incidente.peligroAdicionalId || 0,
        rutina: incidente.rutina || '',
        areaId: incidente.areaId || 0,
        factoresRiesgoIds: incidente.factoresRiesgoIds || [],
        peligrosIds: incidente.peligrosIds || [],
        tareaId: incidente.tareaId || 0,
        caracterizaciones: (incidente.caracterizaciones || []).map((c: any) => ({
          cargoPersonalId: c.cargoPersonalId || 0,
          cargoPersonalNombre: c.cargoPersonalNombre || '',
          caracterizacionPersonalId: c.caracterizacionPersonalId || 0,
          cantidadPersonal: c.cantidadPersonal || 0,
          danosProbables: c.danosProbables || [],
          id: c.id || 0,
          medidasDeControl: (c.medidasDeControl || []).map((m: any) => ({
            nombre: m.nombre || '',
            observaciones_desaprobacion: m.observacionesDesaprobacion || '',
            actividadesControlIds: m.actividadesControlIds || [],
            usuarioRevId: m.usuarioRevId || 0,
            usuarioCreId: m.usuarioCreId || 0,
            usuarioAprId: m.usuarioAprId || 0,
            usuarioSupId: m.usuarioSupId || 0,
            factorRiesgoId: m.factorRiesgoId || 0,
            id: m.id || 0
          }))
        })),
        esta_activo: incidente.esta_activo ?? true
      };
    },
    (err) => {
      this.modelo = {};
    }
  );
}
  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log("guardar",this.modelo);
    this.IncidentesService.put(this.vmP.id, this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro actualizado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
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
}
