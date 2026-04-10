import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DotacionRoutingModule } from './dotacion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DotacionAddComponent } from './componentes/dotacion-add/dotacion-add.component';
import { DotacionEditComponent } from './componentes/dotacion-edit/dotacion-edit.component';
import { DotacionFormComponent } from './componentes/dotacion-form/dotacion-form.component';
import { DotacionListComponent } from './componentes/dotacion-list/dotacion-list.component';


@NgModule({
  declarations: [
    DotacionListComponent,
    DotacionAddComponent,
    DotacionEditComponent,
    DotacionFormComponent],
  imports: [
    CommonModule,
    DotacionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DotacionModule { }
