import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudAdminRoutingModule } from './solicitud-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudAdminListComponent } from './componentes/solicitud-admin-list/solicitud-admin-list.component';
import { SolicitudAdminEditComponent } from './componentes/solicitud-admin-edit/solicitud-admin-edit.component';
import { ObservacionesSolicitudModule } from '../observaciones-solicitud/observaciones-solicitud.module';
import { ModalAdminAsignacionUserComponent } from './componentes/modal-admin-asignacion-user/modal-admin-asignacion-user.component';
import { BitacoraModule } from '../bitacora/bitacora.module';
import { ModalSolicitaRetiroComponent } from './componentes/modal-solicita-retiro/modal-solicita-retiro.component';
import { ModalGenerarCotizacionComponent } from './componentes/modal-generar-cotizacion/modal-generar-cotizacion.component';


@NgModule({
  declarations: [SolicitudAdminListComponent, SolicitudAdminEditComponent,ModalAdminAsignacionUserComponent,ModalSolicitaRetiroComponent,ModalGenerarCotizacionComponent
   
  ],
  imports: [
    FormsModule,
    CommonModule,
    SolicitudAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ObservacionesSolicitudModule,
    BitacoraModule,
    
  ]
})
export class SolicitudAdminModule { }
