import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpresaAddComponent } from './componentes/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './componentes/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './componentes/empresa-list/empresa-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component:  EmpresaListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  EmpresaAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  EmpresaEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule { }
