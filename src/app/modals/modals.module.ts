import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioModalComponent } from './formulario-modal/formulario-modal.component';
import { SharedModule } from '../shared/shared.module';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { MaterialModule } from '../material.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    FormularioModalComponent,
    UploadModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    FormularioModalComponent
  ]
})
export class ModalsModule { }
