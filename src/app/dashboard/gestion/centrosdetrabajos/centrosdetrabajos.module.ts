import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosdetrabajosRoutingModule } from './centrosdetrabajos-routing.module';
import { CentrosdetrabajosAddComponent } from './componentes/centrosdetrabajos-add/centrosdetrabajos-add.component';
import { CentrosdetrabajosEditComponent } from './componentes/centrosdetrabajos-edit/centrosdetrabajos-edit.component';
import { CentrosdetrabajosFormComponent } from './componentes/centrosdetrabajos-form/centrosdetrabajos-form.component';
import { CentrosdetrabajosListComponent } from './componentes/centrosdetrabajos-list/centrosdetrabajos-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CentrosdetrabajosListComponent,
CentrosdetrabajosAddComponent,
CentrosdetrabajosEditComponent,
CentrosdetrabajosFormComponent
  ],
  imports: [
    CommonModule,
    CentrosdetrabajosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CentrosdetrabajosModule { }
