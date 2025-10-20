import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionListComponent } from './componentes/cotizacion-list/cotizacion-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CotizacionAddComponent } from './componentes/cotizacion-add/cotizacion-add.component';
import { CotizacionEditComponent } from './componentes/cotizacion-edit/cotizacion-edit.component';
import { CotizacionEditAdminComponent } from './componentes/cotizacion-edit-admin/cotizacion-edit-admin.component';

const routes: Routes = [
  { path: '', component:  CotizacionListComponent , canActivate: [AuthGuard]},
  { path: 'Add', component:  CotizacionAddComponent , canActivate: [AuthGuard]},
  { path: 'Edit', component:  CotizacionEditComponent , canActivate: [AuthGuard]},
  { path: 'AdmEdit', component:  CotizacionEditAdminComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }
