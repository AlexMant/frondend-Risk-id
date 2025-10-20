import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HardwareAddComponent } from './componentes/hardware-add/hardware-add.component';
import { HardwareEditComponent } from './componentes/hardware-edit/hardware-edit.component';
import { HardwareListComponent } from './componentes/hardware-list/hardware-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HistorialHardModalListComponent } from './componentes/historial-hard-modal-list/historial-hard-modal-list.component';
import { MisBodegasModalLlistComponent } from './componentes/mis-bodegas-modal-llist/mis-bodegas-modal-llist.component';
import { ModalCargaXlsComponent } from './componentes/modal-carga-xls/modal-carga-xls.component';

const routes: Routes = [
  { path: '', component:  HardwareListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  HardwareAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  HardwareEditComponent , canActivate: [AuthGuard]},
  {path: 'hist', component: HistorialHardModalListComponent, canActivate: [AuthGuard]},
  {path: 'bode', component: MisBodegasModalLlistComponent, canActivate: [AuthGuard]},
  {path: 'sube', component: ModalCargaXlsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HardwareRoutingModule { }
