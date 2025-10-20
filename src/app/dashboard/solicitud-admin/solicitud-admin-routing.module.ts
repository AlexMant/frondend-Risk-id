import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudAdminListComponent } from './componentes/solicitud-admin-list/solicitud-admin-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SolicitudAdminEditComponent } from './componentes/solicitud-admin-edit/solicitud-admin-edit.component';

const routes: Routes = [
  { path: 'list', component:  SolicitudAdminListComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  SolicitudAdminEditComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudAdminRoutingModule { }
