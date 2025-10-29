import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProcesosAddComponent } from './componentes/procesos-add/procesos-add.component';
import { ProcesosEditComponent } from './componentes/procesos-edit/procesos-edit.component';
import { ProcesosListComponent } from './componentes/procesos-list/procesos-list.component';

const routes: Routes = [
  { path: '', component:  ProcesosListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  ProcesosAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  ProcesosEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
