import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardItComponent } from './dashboard-it/dashboard-it.component';
import { TablaVepComponent } from './tabla-vep/tabla-vep.component';


const routes: Routes = [

  // { path: '', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-it', component: DashboardItComponent, canActivate: [AuthGuard] },
  { path: 'tabla-vep', component: TablaVepComponent, canActivate: [AuthGuard] },
  {
    path: 'gestion',
    loadChildren: () =>
      import('./gestion/gestion.module').then(
        (m) => m.GestionModule
      ),
  },

  {
    path: 'informes',
    loadChildren: () =>
      import('./informes/informes.module').then(
        (m) => m.InformesModule
      ),
  },

  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./notifcacionesapp/notifcacionesapp.module').then(
        (m) => m.NotifcacionesappModule
      ),
  },
  {
    path: 'incidentes',
    loadChildren: () =>
      import('./incidentes/incidentes.module').then(
        (m) => m.IncidentesModule
      ),
  },
  {
    path: 'flash',
    loadChildren: () =>
      import('./accidentes/flash/flash.module').then(
        (m) => m.FlashModule
      ),
  },







];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class DashboardRoutingModule { }
