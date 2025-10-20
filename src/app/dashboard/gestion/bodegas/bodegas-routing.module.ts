import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodegasAddComponent } from './componentes/bodegas-add/bodegas-add.component';
import { BodegasEditComponent } from './componentes/bodegas-edit/bodegas-edit.component';
import { BodegasListComponent } from './componentes/bodegas-list/bodegas-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component:  BodegasListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  BodegasAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  BodegasEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegasRoutingModule { }
