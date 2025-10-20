import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionesUsuariosListComponent } from './componentes/direcciones-usuarios-list/direcciones-usuarios-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [ { path: '', component:  DireccionesUsuariosListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionesUsuariosRoutingModule { }
