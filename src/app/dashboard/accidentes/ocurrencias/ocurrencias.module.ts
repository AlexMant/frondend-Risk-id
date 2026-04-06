import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OcurrenciasAddComponent } from './componentes/ocurrencias-add/ocurrencias-add.component';
import { OcurrenciasEditComponent } from './componentes/ocurrencias-edit/ocurrencias-edit.component';
import { OcurrenciasFormComponent } from './componentes/ocurrencias-form/ocurrencias-form.component';
import { OcurrenciasListComponent } from './componentes/ocurrencias-list/ocurrencias-list.component';
import { VerImagenOcurrenciasComponent } from './componentes/ver-imagen-ocurrencias/ver-imagen-ocurrencias.component';
import { OcurrenciasRoutingModule } from './ocurrencias-routing.module';
 


@NgModule({
  declarations: [
    OcurrenciasListComponent,
    OcurrenciasAddComponent,
    OcurrenciasEditComponent,
    OcurrenciasFormComponent,
    VerImagenOcurrenciasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OcurrenciasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class OcurrenciasModule { }
