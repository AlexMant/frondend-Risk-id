import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotifcacionesappListComponent } from './componentes/notifcacionesapp-list/notifcacionesapp-list.component';

const routes: Routes = [ { path: '', component:  NotifcacionesappListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifcacionesappRoutingModule { }
