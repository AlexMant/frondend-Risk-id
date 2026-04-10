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
 
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
 
 
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablaVepComponent } from './tabla-vep/tabla-vep.component';
 


@NgModule({
  declarations: [
    PrincipalAdminComponent
    ,HomeAdminComponent
 
    , DashboardAdminComponent
    ,TablaVepComponent
 
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
