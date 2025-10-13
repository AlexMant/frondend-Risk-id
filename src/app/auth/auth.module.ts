import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangeComponent } from './change/change.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
 
 

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    AuthRoutingModule,
    SharedModule,
   
    MaterialModule,
    HttpClientModule
  ],

  declarations: [LoginComponent,   ForgotComponent, ChangeComponent]
  , exports: [  LoginComponent, ForgotComponent, ChangeComponent]
})
export class AuthModule { }
