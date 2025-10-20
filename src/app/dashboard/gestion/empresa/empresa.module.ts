import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaAddComponent } from './componentes/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './componentes/empresa-edit/empresa-edit.component';
import { EmpresaFormComponent } from './componentes/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './componentes/empresa-list/empresa-list.component';


@NgModule({
  declarations: [
    EmpresaListComponent,
    EmpresaAddComponent,
    EmpresaEditComponent,
    EmpresaFormComponent
    ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class EmpresaModule { }
