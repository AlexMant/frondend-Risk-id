import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoliictudRetiroRoutingModule } from './soliictud-retiro-routing.module';
import { SoliictudretiroListComponent } from './componentes/soliictud-retiro-list/soliictud-retiro-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SoliictudRetiroVerComponent } from './componentes/soliictud-retiro-ver/soliictud-retiro-ver.component';


@NgModule({
  declarations: [SoliictudretiroListComponent,SoliictudRetiroVerComponent],
  imports: [
    CommonModule,
    SoliictudRetiroRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class SoliictudRetiroModule { }
