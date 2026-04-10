import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajadoresRoutingModule } from './trabajadores-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrabajadoresAddComponent } from './componentes/trabajadores-add/trabajadores-add.component';
import { TrabajadoresEditComponent } from './componentes/trabajadores-edit/trabajadores-edit.component';
import { TrabajadoresFormComponent } from './componentes/trabajadores-form/trabajadores-form.component';
import { TrabajadoresListComponent } from './componentes/trabajadores-list/trabajadores-list.component';


@NgModule({
  declarations: [
    TrabajadoresListComponent,
    TrabajadoresAddComponent,
    TrabajadoresEditComponent,
    TrabajadoresFormComponent
  ],
  imports: [
    CommonModule,
    TrabajadoresRoutingModule
    ,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TrabajadoresModule { }
