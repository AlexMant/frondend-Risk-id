import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { GEmpresasAddComponent } from './componentes/gempresas-add/gempresas-add.component';
import { GEmpresasEditComponent } from './componentes/gempresas-edit/gempresas-edit.component';
import { GEmpresasListComponent } from './componentes/gempresas-list/gempresas-list.component';

const routes: Routes = [
    { path: '', component:  GEmpresasListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  GEmpresasAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  GEmpresasEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GEmpresasRoutingModule { }
