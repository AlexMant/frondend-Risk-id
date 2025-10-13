import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

 
 



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
 
import { ExportxlsService } from 'src/app/core/services/exportxls.service';
import { AppComponent } from 'src/app/app.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthGuard } from '../guards/auth.guard';
 
 


@NgModule({
  declarations: [
    PrincipalAdminComponent
    ,HomeAdminComponent
    , DashboardUserComponent
   
    , DashboardAdminComponent
 
 
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
