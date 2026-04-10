import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeligrosRoutingModule } from './peligros-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeligrosAddComponent } from './componentes/peligros-add/peligros-add.component';
import { PeligrosEditComponent } from './componentes/peligros-edit/peligros-edit.component';
import { PeligrosFormComponent } from './componentes/peligros-form/peligros-form.component';
import { PeligrosListComponent } from './componentes/peligros-list/peligros-list.component';


@NgModule({
  declarations: [PeligrosListComponent,
    PeligrosAddComponent,
    PeligrosEditComponent,
    PeligrosFormComponent],
  imports: [
    CommonModule,
    PeligrosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PeligrosModule { }
