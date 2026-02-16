import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FlashAddComponent } from './componentes/flash-add/flash-add.component';
import { FlashEditComponent } from './componentes/flash-edit/flash-edit.component';
import { FlashListComponent } from './componentes/flash-list/flash-list.component';

const routes: Routes = [{ path: '', component:  FlashListComponent , canActivate: [AuthGuard]},
  { path: 'add', component:  FlashAddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component:  FlashEditComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashRoutingModule { }
