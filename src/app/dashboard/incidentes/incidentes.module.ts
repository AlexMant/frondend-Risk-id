import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentesListComponent } from './componentes/incidentes-list/incidentes-list.component';
import { IncidentesFormComponent } from './componentes/incidentes-form/incidentes-form.component';
import { IncidentesAddComponent } from './componentes/incidentes-add/incidentes-add.component';
import { IncidentesEditComponent } from './componentes/incidentes-edit/incidentes-edit.component';
import { DescargarIperComponent } from './componentes/descargar-iper/descargar-iper.component';
import { TablaVepFormComponent } from './componentes/tabla-vep-form/tabla-vep-form.component';
import { AddUbicacionIncidenteModalComponent } from './componentes/add-ubicacion-incidente-modal/add-ubicacion-incidente-modal.component';
import { EvaluacionRiesgoModalComponent } from './componentes/evaluacion-riesgo-modal/evaluacion-riesgo-modal.component';
import { IncidenteVerComponent } from './componentes/incidente-ver/incidente-ver.component';


@NgModule({
  declarations: [IncidentesListComponent,IncidentesFormComponent,IncidentesAddComponent,IncidentesEditComponent, DescargarIperComponent, TablaVepFormComponent
    ,AddUbicacionIncidenteModalComponent
    ,EvaluacionRiesgoModalComponent,IncidenteVerComponent
  ],
  imports: [
    CommonModule,
    IncidentesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class IncidentesModule { }
