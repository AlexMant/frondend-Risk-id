import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
          canActivate:[AuthGuard]
      },
      {
        path: 'empresa',
        loadChildren: () =>
          import('./empresa/empresa.module').then(
            (m) => m.EmpresaModule
          ),
      },
      {
        path: 'procesos',
        loadChildren: () =>
          import('./procesos/procesos.module').then(
            (m) => m.ProcesosModule
          ),
      },
     
       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
