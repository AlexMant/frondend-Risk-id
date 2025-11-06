import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentesListComponent } from './componentes/incidentes-list/incidentes-list.component';
import { IncidentesFormComponent } from './componentes/incidentes-form/incidentes-form.component';
import { IncidentesAddComponent } from './componentes/incidentes-add/incidentes-add.component';
import { IncidentesEditComponent } from './componentes/incidentes-edit/incidentes-edit.component';
import { DescargarIperComponent } from './componentes/descargar-iper/descargar-iper.component';


@NgModule({
  declarations: [IncidentesListComponent,IncidentesFormComponent,IncidentesAddComponent,IncidentesEditComponent, DescargarIperComponent],
  imports: [
    CommonModule,
    IncidentesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class IncidentesModule { }
