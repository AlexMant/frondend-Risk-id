import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegasEmpresaListComponent } from './componentes/bodegas-empresa-list/bodegas-empresa-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [ { path: '', component:  BodegasEmpresaListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegasEmpresaRoutingModule { }
