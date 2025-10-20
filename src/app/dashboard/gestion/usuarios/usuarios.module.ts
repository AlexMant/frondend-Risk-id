import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosAddComponent } from './componentes/usuarios-add/usuarios-add.component';
import { UsuariosEditComponent } from './componentes/usuarios-edit/usuarios-edit.component';
import { UsuariosFormComponent } from './componentes/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UsuariosListComponent,
    UsuariosAddComponent,
    UsuariosEditComponent,
    UsuariosFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UsuariosModule { }
