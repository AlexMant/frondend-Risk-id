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
        path: 'bodegas',
        loadChildren: () =>
          import('./bodegas/bodegas.module').then(
            (m) => m.BodegasModule
          ),
      },
      {
        path: 'items',
        loadChildren: () =>
          import('./items/items.module').then(
            (m) => m.ItemsModule
          ),
      },
      {
        path: 'hardware',
        loadChildren: () =>
          import('./hardware/hardware.module').then(
            (m) => m.HardwareModule
          ),
      },
      {
        path: 'bodegas-empresa',
        loadChildren: () =>
          import('./bodegas-empresa/bodegas-empresa.module').then(
            (m) => m.BodegasEmpresaModule
          ),
      },
      {
        path: 'asignaciones-hardware',
        loadChildren: () =>
          import('./asignaciones-Hardware/asignaciones-hardware.module').then(
            (m) => m.AsignacionesHardwareModule
          ),
      },
      {
        path: 'direccion-empresa',
        loadChildren: () =>
          import('./direcciones-empresa/direcciones-empresa.module').then(
            (m) => m.DireccionesEmpresaModule
          ),
      },
      {
        path: 'direccion-usuario',
        loadChildren: () =>
          import('./direcciones-usuarios/direcciones-usuarios.module').then(
            (m) => m.DireccionesUsuariosModule
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
