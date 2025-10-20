import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudUserListComponent } from './componentes/solicitud-user-list/solicitud-user-list.component';
import { SolicitudUserAddComponent } from './componentes/solicitud-user-add/solicitud-user-add.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AsignacionUserListComponent } from './componentes/asignacion-user-list/asignacion-user-list.component';
import { SolicitudUserEditComponent } from './componentes/solicitud-user-edit/solicitud-user-edit.component';

const routes: Routes = [
  { path: 'list', component: SolicitudUserListComponent, canActivate: [AuthGuard] },
  { path: '', component: SolicitudUserListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: SolicitudUserAddComponent, canActivate: [AuthGuard] },
  { path: 'asignacion', component: AsignacionUserListComponent, canActivate: [AuthGuard] },
  {path: 'edit', component: SolicitudUserEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudUserRoutingModule { }
