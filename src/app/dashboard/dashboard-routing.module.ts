import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
 
import { TablaVepComponent } from './tabla-vep/tabla-vep.component';


const routes: Routes = [

   //{ path: '', component: HomeAdminComponent, canActivate: [AuthGuard] },
    { path: '', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
 
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
    path: 'ocurrencias',
    loadChildren: () =>
      import('./accidentes/ocurrencias/ocurrencias.module').then(
        (m) => m.OcurrenciasModule
      ),
  },







];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class DashboardRoutingModule { }
