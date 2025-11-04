import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcesosEditComponent } from './componentes/procesos-edit/procesos-edit.component';
import { ProcesosListComponent } from './componentes/procesos-list/procesos-list.component';
import { ProcesosFormComponent } from './componentes/procesos-form/procesos-form.component';
import { ProcesosAddComponent } from './componentes/procesos-add/procesos-add.component';
import { ModalsubprocesosComponent } from './componentes/modalsubprocesos/modalsubprocesos.component';
import { ModaltareasComponent } from './componentes/modaltareas/modaltareas.component';


@NgModule({
  declarations: [
    ProcesosEditComponent,
    ProcesosListComponent,
    ProcesosFormComponent,
    ProcesosAddComponent,
    ModalsubprocesosComponent,
    ModaltareasComponent
  ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
  ]
})
export class ProcesosModule { }
