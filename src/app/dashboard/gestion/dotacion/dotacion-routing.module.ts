import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DotacionAddComponent } from './componentes/dotacion-add/dotacion-add.component';
import { DotacionEditComponent } from './componentes/dotacion-edit/dotacion-edit.component';
import { DotacionListComponent } from './componentes/dotacion-list/dotacion-list.component';

const routes: Routes = [  { path: '', component:  DotacionListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  DotacionAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  DotacionEditComponent , canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotacionRoutingModule { }
