import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SoliictudretiroListComponent } from './componentes/soliictud-retiro-list/soliictud-retiro-list.component';

const routes: Routes = [  { path: '', component:  SoliictudretiroListComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoliictudRetiroRoutingModule { }
