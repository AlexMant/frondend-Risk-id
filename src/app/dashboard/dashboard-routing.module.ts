import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
 
 

const routes: Routes = [

  { path: '', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard] },
 

  // {
  //   path: 'gestion',
  //   loadChildren: () =>
  //     import('./gestion/gestion.module').then(
  //       (m) => m.GestionModule
  //     ),
  // },
  // {
  //   path: 'cotizacion',
  //   loadChildren: () =>
  //     import('./cotizacion/cotizacion.module').then(
  //       (m) => m.CotizacionModule
  //     ),

  // },
  // {
  //   path: 'solicitud-admin',
  //   loadChildren: () =>
  //     import('./solicitud-admin/solicitud-admin.module').then(
  //       (m) => m.SolicitudAdminModule
  //     ),
  // },
  // {
  //   path: 'informes',
  //   loadChildren: () =>
  //     import('./informes/informes.module').then(
  //       (m) => m.InformesModule
  //     ),
  // },
  // {
  //   path: 'solicitud-user',
  //   loadChildren: () =>
  //     import('./solicitud-user/solicitud-user.module').then(
  //       (m) => m.SolicitudUserModule
  //     ),
  // },
  // {
  //   path: 'retiros',
  //   loadChildren: () =>
  //     import('./soliictud-retiro/soliictud-retiro.module').then(
  //       (m) => m.SoliictudRetiroModule
  //     ),
  // },
  // {
  //   path: 'notificaciones',
  //   loadChildren: () =>
  //     import('./notifcacionesapp/notifcacionesapp.module').then(
  //       (m) => m.NotifcacionesappModule
  //     ),
  // },







];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class DashboardRoutingModule { }
