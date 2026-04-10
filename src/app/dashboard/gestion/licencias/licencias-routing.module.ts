import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LicenciasAddComponent } from './componentes/licencias-add/licencias-add.component';
import { LicenciasEditComponent } from './componentes/licencias-edit/licencias-edit.component';
import { LicenciasListComponent } from './componentes/licencias-list/licencias-list.component';

const routes: Routes = [{ path: '', component: LicenciasListComponent, canActivate: [AuthGuard] },
{ path: 'add', component: LicenciasAddComponent, canActivate: [AuthGuard] },
{ path: 'edit', component: LicenciasEditComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenciasRoutingModule { }
