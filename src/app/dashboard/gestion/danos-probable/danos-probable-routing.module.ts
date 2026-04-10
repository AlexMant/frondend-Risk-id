import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DanosProbableAddComponent } from './componentes/danos-probable-add/danos-probable-add.component';
import { DanosProbableEditComponent } from './componentes/danos-probable-edit/danos-probable-edit.component';
import { DanosProbableListComponent } from './componentes/danos-probable-list/danos-probable-list.component';

const routes: Routes = [
   { path: '', component:  DanosProbableListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  DanosProbableAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  DanosProbableEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanosProbableRoutingModule { }
