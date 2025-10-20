import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ItemsAddComponent } from './componentes/items-add/items-add.component';
import { ItemsEditComponent } from './componentes/items-edit/items-edit.component';
import { ItemsListComponent } from './componentes/items-list/items-list.component';

const routes: Routes = [
  { path: '', component:  ItemsListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  ItemsAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  ItemsEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
