import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DireccionesEmpresaRoutingModule } from './direcciones-empresa-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DireccionesEmpresaFormComponent } from './componentes/direcciones-empresa-form/direcciones-empresa-form.component';
import { DireccionesEmpresaListComponent } from './componentes/direcciones-empresa-list/direcciones-empresa-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
 

@NgModule({
  declarations: [DireccionesEmpresaFormComponent,DireccionesEmpresaListComponent],
  imports: [
    CommonModule,
     
    DireccionesEmpresaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class DireccionesEmpresaModule { }
