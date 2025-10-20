import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosAddComponent } from './componentes/usuarios-add/usuarios-add.component';
import { UsuariosEditComponent } from './componentes/usuarios-edit/usuarios-edit.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component:  UsuariosListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  UsuariosAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  UsuariosEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
