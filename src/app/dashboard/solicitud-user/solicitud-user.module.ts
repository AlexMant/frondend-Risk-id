import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudUserRoutingModule } from './solicitud-user-routing.module';
import { AsignacionUserListComponent } from './componentes/asignacion-user-list/asignacion-user-list.component';
import { SolicitudUserListComponent } from './componentes/solicitud-user-list/solicitud-user-list.component';
import { SolicitudUserAddComponent } from './componentes/solicitud-user-add/solicitud-user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListHardwareMantUserComponent } from './componentes/list-hardware-mant-user/list-hardware-mant-user.component';
import { ListHardwareNewUserComponent } from './componentes/list-hardware-new-user/list-hardware-new-user.component';
import { FormHardwareNewUserComponent } from './componentes/form-hardware-new-user/form-hardware-new-user.component';
import { SolicitudUserEditComponent } from './componentes/solicitud-user-edit/solicitud-user-edit.component';
import { ObservacionesSolicitudModule } from '../observaciones-solicitud/observaciones-solicitud.module';
 


@NgModule({
  declarations: [AsignacionUserListComponent
    ,SolicitudUserListComponent
    ,SolicitudUserAddComponent
  ,ListHardwareMantUserComponent
  ,ListHardwareNewUserComponent
  ,FormHardwareNewUserComponent
,SolicitudUserEditComponent
 
 ],
  imports: [
    FormsModule,
    CommonModule,
    SolicitudUserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ObservacionesSolicitudModule,
  ]
})
export class SolicitudUserModule { }
