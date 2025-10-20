import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExportxlsService } from '../core/services/exportxls.service';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardItComponent } from './dashboard-it/dashboard-it.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ResumenSolicitudListComponent } from './resumen-solicitud-list/resumen-solicitud-list.component';
import { HardwareDisponibleListComponent } from './hardware-disponible/hardware-disponible-list/hardware-disponible-list.component';
import { HardwareDisponibleDetComponent } from './hardware-disponible/hardware-disponible-det/hardware-disponible-det.component';
import { ResumenCotizacionListComponent } from './resumen-cotizacion-list/resumen-cotizacion-list.component';
import { InventarioDisponibleListComponent } from './inventario-empresa/inventario-disponible-list/inventario-disponible-list.component';
import { ModalHardwareUserComponent } from './modales/modal-hardware-user/modal-hardware-user.component';
import { ModalHardwareEverwareComponent } from './modales/modal-hardware-everware/modal-hardware-everware.component';
import { NgApexchartsModule } from 'ng-apexcharts';
 


@NgModule({
  declarations: [
    PrincipalAdminComponent
    ,HomeAdminComponent
    , DashboardUserComponent
    ,DashboardItComponent
    , DashboardAdminComponent
    ,ResumenSolicitudListComponent
    ,HardwareDisponibleListComponent
    ,HardwareDisponibleDetComponent
    ,ResumenCotizacionListComponent
    ,InventarioDisponibleListComponent
    ,ModalHardwareUserComponent
    ,ModalHardwareEverwareComponent
 
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  
  ],
  providers: [AuthGuard, { provide: LOCALE_ID, useValue: 'es' },ExportxlsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DashboardModule { }
