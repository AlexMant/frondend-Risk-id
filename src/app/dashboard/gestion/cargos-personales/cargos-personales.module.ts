import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosPersonalesRoutingModule } from './cargos-personales-routing.module';
import { CargospersonalesAddComponent } from './componentes/cargos-personales-add/cargos-personales-add.component';
import { CargospersonalesEditComponent } from './componentes/cargos-personales-edit/cargos-personales-edit.component';
import { CargospersonalesFormComponent } from './componentes/cargos-personales-form/cargos-personales-form.component';
import { CargospersonalesListComponent } from './componentes/cargos-personales-list/cargos-personales-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [

CargospersonalesListComponent,
CargospersonalesAddComponent,
CargospersonalesEditComponent,
CargospersonalesFormComponent

  ],
  imports: [
    CommonModule,
    CargosPersonalesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CargosPersonalesModule { }
