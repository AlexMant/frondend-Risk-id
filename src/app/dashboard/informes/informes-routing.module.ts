import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeControlInventarioComponent } from './componentes/informe-control-inventario/informe-control-inventario.component';
import { InformeControlAsignacionComponent } from './componentes/informe-control-asignacion/informe-control-asignacion.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: 'inf-inventario', component:  InformeControlInventarioComponent , canActivate: [AuthGuard]},
  { path: 'inf-asignacion', component:  InformeControlAsignacionComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
