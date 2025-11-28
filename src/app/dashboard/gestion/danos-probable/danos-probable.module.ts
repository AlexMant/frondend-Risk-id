import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanosProbableRoutingModule } from './danos-probable-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DanosProbableListComponent } from './componentes/danos-probable-list/danos-probable-list.component';
import { DanosProbableAddComponent } from './componentes/danos-probable-add/danos-probable-add.component';
import { DanosProbableEditComponent } from './componentes/danos-probable-edit/danos-probable-edit.component';
import { DanosProbableFormComponent } from './componentes/danos-probable-form/danos-probable-form.component';


@NgModule({
  declarations: [
      DanosProbableListComponent,
      DanosProbableAddComponent,
      DanosProbableEditComponent,
      DanosProbableFormComponent
  ],
  imports: [
    CommonModule,
    DanosProbableRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DanosProbableModule { }
