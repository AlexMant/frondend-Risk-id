import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UbicacionesAddComponent } from './componentes/ubicaciones-add/ubicaciones-add.component';
import { UbicacionesEditComponent } from './componentes/ubicaciones-edit/ubicaciones-edit.component';
import { UbicacionesListComponent } from './componentes/ubicaciones-list/ubicaciones-list.component';

const routes: Routes = [
   { path: '', component:  UbicacionesListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  UbicacionesAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  UbicacionesEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionesRoutingModule { }
