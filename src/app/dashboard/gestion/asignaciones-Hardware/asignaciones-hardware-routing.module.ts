import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionesHardwareListComponent } from './componentes/asignaciones-hardware-list/asignaciones-hardware-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [ { path: '', component:  AsignacionesHardwareListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionesHardwareRoutingModule { }
