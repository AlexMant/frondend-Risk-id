import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { HomeComponent } from './home/home.component';
import { PrincipalAdminComponent } from './dashboard/principal-admin/principal-admin.component';
import { EnConstruccionComponent } from './en-construccion.component';
import { AccesoDenegadoComponent } from './acceso-denegado.component';





const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'ui',
  //   loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),

  // },
  {
    path: 'dashboard', component: PrincipalAdminComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: 'acceso-denegado', component: AccesoDenegadoComponent },
  {
    path: '',
    component: PrincipalComponent,

    children: [
      { path: '', component: HomeComponent},
    ]
  },
  // ...existing routes...
  { path: '**', component: EnConstruccionComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],

  exports: [RouterModule],
  providers: [],
  declarations: [],
})
export class AppRoutingRoutes { }


// imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],