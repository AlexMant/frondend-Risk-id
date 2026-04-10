import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenciasRoutingModule } from './licencias-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LicenciasAddComponent } from './componentes/licencias-add/licencias-add.component';
import { LicenciasEditComponent } from './componentes/licencias-edit/licencias-edit.component';
import { LicenciasFormComponent } from './componentes/licencias-form/licencias-form.component';
import { LicenciasListComponent } from './componentes/licencias-list/licencias-list.component';


@NgModule({
  declarations: [
    LicenciasListComponent,
    LicenciasAddComponent,
    LicenciasEditComponent,
    LicenciasFormComponent],
  imports: [
    CommonModule,
    LicenciasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class LicenciasModule { }
