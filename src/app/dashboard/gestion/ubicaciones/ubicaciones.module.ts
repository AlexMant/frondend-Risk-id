import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionesRoutingModule } from './ubicaciones-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UbicacionesAddComponent } from './componentes/ubicaciones-add/ubicaciones-add.component';
import { UbicacionesEditComponent } from './componentes/ubicaciones-edit/ubicaciones-edit.component';
import { UbicacionesFormComponent } from './componentes/ubicaciones-form/ubicaciones-form.component';
import { UbicacionesListComponent } from './componentes/ubicaciones-list/ubicaciones-list.component';


@NgModule({
  declarations: [
    UbicacionesListComponent,
    UbicacionesAddComponent,
    UbicacionesEditComponent,
    UbicacionesFormComponent

  ],
  imports: [
    CommonModule,
    UbicacionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UbicacionesModule { }
