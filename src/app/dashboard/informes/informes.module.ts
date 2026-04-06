import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InformesRoutingModule } from './informes-routing.module';
 
import { ExportxlsService } from 'src/app/core/services/exportxls.service';
import { SimuladorDs67Component } from './componentes/simulador-ds67/simulador-ds67.component';
import { IndicadorSstComponent } from './componentes/indicador-sst/indicador-sst.component';
import { AnalisisFlashComponent } from './componentes/analisis-flash/analisis-flash.component';
import { MapaRiesgoComponent } from './componentes/mapa-riesgo/mapa-riesgo.component';



@NgModule({
  declarations: [
    SimuladorDs67Component,
    IndicadorSstComponent,
    AnalisisFlashComponent,
    MapaRiesgoComponent

  ],
  imports: [
    
    CommonModule,
    InformesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ExportxlsService],
})
export class InformesModule { }
