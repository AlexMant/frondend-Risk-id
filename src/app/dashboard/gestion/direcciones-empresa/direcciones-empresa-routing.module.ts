import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionesEmpresaListComponent } from './componentes/direcciones-empresa-list/direcciones-empresa-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [ { path: '', component:  DireccionesEmpresaListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionesEmpresaRoutingModule { }
