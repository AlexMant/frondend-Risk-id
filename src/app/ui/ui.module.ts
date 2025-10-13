import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { UiComponent } from './ui.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MantenedorAddComponent } from './mantenedor-add/mantenedor-add.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    UiComponent,
    MantenedorAddComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class UiModule { }
