import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraFormComponent } from './componentes/bitacora-form/bitacora-form.component';
import { BitacoraListComponent } from './componentes/bitacora-list/bitacora-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BitacoraListComponent,
 
    BitacoraFormComponent],
  imports: [
    CommonModule,
    
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [BitacoraListComponent,
 
    BitacoraFormComponent]
})
export class BitacoraModule { }
