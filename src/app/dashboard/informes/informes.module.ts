import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InformesRoutingModule } from './informes-routing.module';
import { InformeControlAsignacionComponent } from './componentes/informe-control-asignacion/informe-control-asignacion.component';
import { InformeControlInventarioComponent } from './componentes/informe-control-inventario/informe-control-inventario.component';
import { ExportxlsService } from 'src/app/core/services/exportxls.service';



@NgModule({
  declarations: [InformeControlAsignacionComponent, InformeControlInventarioComponent],
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
