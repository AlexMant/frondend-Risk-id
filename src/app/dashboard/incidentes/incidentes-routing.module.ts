import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { IncidentesAddComponent } from './componentes/incidentes-add/incidentes-add.component';
import { IncidentesEditComponent } from './componentes/incidentes-edit/incidentes-edit.component';
import { IncidentesListComponent } from './componentes/incidentes-list/incidentes-list.component';
import { DescargarIperComponent } from './componentes/descargar-iper/descargar-iper.component';
import { TablaVepFormComponent } from './componentes/tabla-vep-form/tabla-vep-form.component';

const routes: Routes = [
  { path: '', component:  IncidentesListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  IncidentesAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  IncidentesEditComponent , canActivate: [AuthGuard]},
  { path: 'descargar-iper', component:  DescargarIperComponent , canActivate: [AuthGuard]},
   { path: 'tabla-vep', component:  TablaVepFormComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentesRoutingModule { }
