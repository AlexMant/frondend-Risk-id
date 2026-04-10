import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GEmpresasRoutingModule } from './gempresas-routing.module';
import { GEmpresasAddComponent } from './componentes/gempresas-add/gempresas-add.component';
import { GEmpresasEditComponent } from './componentes/gempresas-edit/gempresas-edit.component';
import { GEmpresasFormComponent } from './componentes/gempresas-form/gempresas-form.component';
import { GEmpresasListComponent } from './componentes/gempresas-list/gempresas-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GEmpresasListComponent,
GEmpresasAddComponent,
GEmpresasEditComponent,
GEmpresasFormComponent],
  imports: [
    CommonModule,
    GEmpresasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class GEmpresasModule { }
