import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ObservacionesSolicitudListComponent } from './componentes/observaciones-solicitud-list/observaciones-solicitud-list.component';
import { ObservacionessolicitudFormComponent } from './componentes/observaciones-solicitud-form/observaciones-solicitud-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ObservacionesSolicitudListComponent,
    ObservacionessolicitudFormComponent
  ],
  imports: [
   
    CommonModule,
 
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [ObservacionesSolicitudListComponent,
    ObservacionessolicitudFormComponent]
})
export class ObservacionesSolicitudModule { }
