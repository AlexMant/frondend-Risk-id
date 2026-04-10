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
        canActivate: [AuthGuard]
      },
      {
        path: 'empresa',
        loadChildren: () =>
          import('./empresa/empresa.module').then(
            (m) => m.EmpresaModule
          ),
      },
      {
        path: 'holding',
        loadChildren: () =>
          import('./GEmpresas/gempresas.module').then(
            (m) => m.GEmpresasModule
          ),
      },

      {
        path: 'danos-probable',
        loadChildren: () =>
          import('./danos-probable/danos-probable.module').then(
            (m) => m.DanosProbableModule
          ),
      },
      {
        path: 'centros-de-trabajo',
        loadChildren: () =>
          import('./centrosdetrabajos/centrosdetrabajos.module').then(
            (m) => m.CentrosdetrabajosModule
          ),
      },
      {
        path: 'peligros',
        loadChildren: () =>
          import('./peligros/peligros.module').then(
            (m) => m.PeligrosModule
          ),
      },
      {
        path: 'cargos-personales',
        loadChildren: () =>
          import('./cargos-personales/cargos-personales.module').then(
            (m) => m.CargosPersonalesModule
          ),
      },
      {
        path: 'ubicaciones',
        loadChildren: () =>
          import('./ubicaciones/ubicaciones.module').then(
            (m) => m.UbicacionesModule
          ),
      },
      {
        path: 'procesos',
        loadChildren: () =>
          import('./procesos/procesos.module').then(
            (m) => m.ProcesosModule
          ),
      },
      {
        path: 'trabajadores',
        loadChildren: () =>
          import('./trabajadores/trabajadores.module').then(
            (m) => m.TrabajadoresModule
          ),
      },
      {
        path: 'dotacion',
        loadChildren: () =>
          import('./dotacion/dotacion.module').then(
            (m) => m.DotacionModule
          ),
      },
      {
        path: 'licencias',
        loadChildren: () =>
          import('./licencias/licencias.module').then(
            (m) => m.LicenciasModule
          ),
      },
       {
        path: 'asistencias',
        loadChildren: () =>
          import('./asistencia/asistencia.module').then(
            (m) => m.AsistenciaModule
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
