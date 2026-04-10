import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { OcurrenciasAddComponent } from './componentes/ocurrencias-add/ocurrencias-add.component';
import { OcurrenciasListComponent } from './componentes/ocurrencias-list/ocurrencias-list.component';
import { VerOcurrenciasComponent } from './componentes/ver-ocurrencias/ver-ocurrencias.component';
import { OcurrenciasEditComponent } from './componentes/ocurrencias-edit/ocurrencias-edit.component';
 

const routes: Routes = [{ path: '', component: OcurrenciasListComponent, canActivate: [AuthGuard] },
{ path: 'add', component: OcurrenciasAddComponent, canActivate: [AuthGuard] },
{ path: 'edit', component: OcurrenciasEditComponent, canActivate: [AuthGuard] },
{ path: 'ver', component: VerOcurrenciasComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcurrenciasRoutingModule { }
