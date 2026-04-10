import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PeligrosAddComponent } from './componentes/peligros-add/peligros-add.component';
import { PeligrosEditComponent } from './componentes/peligros-edit/peligros-edit.component';
import { PeligrosListComponent } from './componentes/peligros-list/peligros-list.component';

const routes: Routes = [{ path: '', component: PeligrosListComponent, canActivate: [AuthGuard] },
{ path: 'add', component: PeligrosAddComponent, canActivate: [AuthGuard] },
{ path: 'edit', component: PeligrosEditComponent, canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeligrosRoutingModule { }
