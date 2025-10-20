import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodegasRoutingModule } from './bodegas-routing.module';
import { BodegasListComponent } from './componentes/bodegas-list/bodegas-list.component';
import { BodegasAddComponent } from './componentes/bodegas-add/bodegas-add.component';
import { BodegasEditComponent } from './componentes/bodegas-edit/bodegas-edit.component';
import { BodegasFormComponent } from './componentes/bodegas-form/bodegas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BodegasListComponent,
    BodegasAddComponent,
    BodegasEditComponent,
    BodegasFormComponent],
  imports: [
    CommonModule,
    BodegasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class BodegasModule { }
