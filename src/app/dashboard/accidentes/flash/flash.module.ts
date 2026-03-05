import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashRoutingModule } from './flash-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlashAddComponent } from './componentes/flash-add/flash-add.component';
import { FlashEditComponent } from './componentes/flash-edit/flash-edit.component';
import { FlashFormComponent } from './componentes/flash-form/flash-form.component';
import { FlashListComponent } from './componentes/flash-list/flash-list.component';
import { VerImagenFlashComponent } from './componentes/ver-imagen-flash/ver-imagen-flash.component';
 


@NgModule({
  declarations: [
    FlashListComponent,
    FlashAddComponent,
    FlashEditComponent,
    FlashFormComponent,
    VerImagenFlashComponent,
 
  ],
  imports: [
    CommonModule,
    FlashRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class FlashModule { }
