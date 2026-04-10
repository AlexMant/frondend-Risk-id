import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CargospersonalesAddComponent } from './componentes/cargos-personales-add/cargos-personales-add.component';
import { CargospersonalesEditComponent } from './componentes/cargos-personales-edit/cargos-personales-edit.component';
import { CargospersonalesListComponent } from './componentes/cargos-personales-list/cargos-personales-list.component';

const routes: Routes = [
{ path: '', component:  CargospersonalesListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  CargospersonalesAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  CargospersonalesEditComponent , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosPersonalesRoutingModule { }
