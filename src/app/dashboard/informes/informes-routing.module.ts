import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AuthGuard } from 'src/app/guards/auth.guard';
import { IndicadorSstComponent } from './componentes/indicador-sst/indicador-sst.component';
import { AnalisisFlashComponent } from './componentes/analisis-flash/analisis-flash.component';
import { SimuladorDs67Component } from './componentes/simulador-ds67/simulador-ds67.component';
import { MapaRiesgoComponent } from './componentes/mapa-riesgo/mapa-riesgo.component';
import { PrecursoresComponent } from './componentes/precursores/precursores.component';

const routes: Routes = [
  { path: 'indicador-sst', component:  IndicadorSstComponent , canActivate: [AuthGuard]},
  { path: 'analisis-flash', component:  AnalisisFlashComponent , canActivate: [AuthGuard]},
  { path: 'simulador-ds67', component:  SimuladorDs67Component , canActivate: [AuthGuard]},
  { path: 'mapa-riesgo', component:  MapaRiesgoComponent , canActivate: [AuthGuard]},
  {path: 'precursores',  component:  PrecursoresComponent , canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
