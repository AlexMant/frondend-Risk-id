import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionesHardwareRoutingModule } from './asignaciones-hardware-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsignacionesHardwareListComponent } from './componentes/asignaciones-hardware-list/asignaciones-hardware-list.component';
import { AsignacionesHardwareFormComponent } from './componentes/asignaciones-hardware-form/asignaciones-hardware-form.component';
import { ModalHardwareDisponibleUserComponent } from './componentes/modal-hardware-disponible-user/modal-hardware-disponible-user.component';


@NgModule({
  declarations: [AsignacionesHardwareListComponent,AsignacionesHardwareFormComponent,ModalHardwareDisponibleUserComponent],
  imports: [
    CommonModule,
    AsignacionesHardwareRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AsignacionesHardwareModule { }
