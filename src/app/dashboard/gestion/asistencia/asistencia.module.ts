import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsistenciaAddComponent } from './componentes/asistencia-add/asistencia-add.component';
import { AsistenciaEditComponent } from './componentes/asistencia-edit/asistencia-edit.component';
import { AsistenciaFormComponent } from './componentes/asistencia-form/asistencia-form.component';
import { AsistenciaListComponent } from './componentes/asistencia-list/asistencia-list.component';


@NgModule({
  declarations: [
AsistenciaListComponent,
AsistenciaAddComponent,
AsistenciaEditComponent,
AsistenciaFormComponent],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AsistenciaModule { }
