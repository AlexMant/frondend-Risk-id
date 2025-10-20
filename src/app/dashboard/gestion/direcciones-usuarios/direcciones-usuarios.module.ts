import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DireccionesUsuariosRoutingModule } from './direcciones-usuarios-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DireccionesUsuariosListComponent } from './componentes/direcciones-usuarios-list/direcciones-usuarios-list.component';
import { DireccionesUsuariosFormComponent } from './componentes/direcciones-usuarios-form/direcciones-usuarios-form.component';


@NgModule({
  declarations: [DireccionesUsuariosListComponent,DireccionesUsuariosFormComponent],
  imports: [
    CommonModule,
    DireccionesUsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class DireccionesUsuariosModule { }
