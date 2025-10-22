import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  LOCALE_ID
} from '@angular/core';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { NavegarService } from './navegar.service';
import { CommonModule, NgOptimizedImage, registerLocaleData } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AppRoutingRoutes } from './app-routing.module';
import { VmParametrosModule } from './core/viewmodel/vm-parametros.module';
import { MaterialModule } from './material.module';
 
 
import { PrincipalComponent } from './principal/principal.component';
import { ModalsModule } from './modals/modals.module';
import { SharedModule } from './shared/shared.module';
 
import { NgApexchartsModule } from 'ng-apexcharts';

registerLocaleData(localeEs, 'es');

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    
    AppComponent,
    
    HomeComponent,
    PrincipalComponent
 
  ],
  imports: [
    SharedModule,
    CommonModule,
    ModalsModule,
 
    FormsModule,
    AppRoutingRoutes,
    BrowserModule,
    NgApexchartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrlClean],
        disallowedRoutes: [],
      },
    }),
   //  BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,

    VmParametrosModule.forRoot(),
    AppRoutingRoutes,
    BrowserAnimationsModule,
  // AngularEditorModule,
    MaterialModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    
  ],
  providers: [AuthGuard, { provide: LOCALE_ID, useValue: 'es' }, NavegarService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
