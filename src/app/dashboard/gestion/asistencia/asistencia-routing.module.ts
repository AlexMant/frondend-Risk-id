import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AsistenciaAddComponent } from './componentes/asistencia-add/asistencia-add.component';
import { AsistenciaEditComponent } from './componentes/asistencia-edit/asistencia-edit.component';
import { AsistenciaListComponent } from './componentes/asistencia-list/asistencia-list.component';


const routes: Routes = [
  { path: '', component:  AsistenciaListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  AsistenciaAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  AsistenciaEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
