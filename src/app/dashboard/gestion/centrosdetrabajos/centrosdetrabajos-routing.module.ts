import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CentrosdetrabajosAddComponent } from './componentes/centrosdetrabajos-add/centrosdetrabajos-add.component';
import { CentrosdetrabajosEditComponent } from './componentes/centrosdetrabajos-edit/centrosdetrabajos-edit.component';
import { CentrosdetrabajosListComponent } from './componentes/centrosdetrabajos-list/centrosdetrabajos-list.component';

const routes: Routes = [
  { path: '', component:  CentrosdetrabajosListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  CentrosdetrabajosAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  CentrosdetrabajosEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosdetrabajosRoutingModule { }
