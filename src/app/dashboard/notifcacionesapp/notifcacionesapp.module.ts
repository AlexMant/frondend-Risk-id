import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifcacionesappRoutingModule } from './notifcacionesapp-routing.module';
import { NotifcacionesappListComponent } from './componentes/notifcacionesapp-list/notifcacionesapp-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [NotifcacionesappListComponent,],
  imports: [
    CommonModule,
    NotifcacionesappRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class NotifcacionesappModule { }
