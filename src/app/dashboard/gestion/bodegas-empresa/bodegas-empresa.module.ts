import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodegasEmpresaRoutingModule } from './bodegas-empresa-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BodegasEmpresaListComponent } from './componentes/bodegas-empresa-list/bodegas-empresa-list.component';
import { BodegasEmpresaFormComponent } from './componentes/bodegas-empresa-form/bodegas-empresa-form.component';


@NgModule({
  declarations: [BodegasEmpresaListComponent,BodegasEmpresaFormComponent],
  imports: [
    CommonModule,
    BodegasEmpresaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class BodegasEmpresaModule { }
