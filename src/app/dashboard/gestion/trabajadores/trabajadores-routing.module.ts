import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TrabajadoresAddComponent } from './componentes/trabajadores-add/trabajadores-add.component';
import { TrabajadoresEditComponent } from './componentes/trabajadores-edit/trabajadores-edit.component';
import { TrabajadoresListComponent } from './componentes/trabajadores-list/trabajadores-list.component';

const routes: Routes = [
    { path: '', component:  TrabajadoresListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  TrabajadoresAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  TrabajadoresEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajadoresRoutingModule { }
