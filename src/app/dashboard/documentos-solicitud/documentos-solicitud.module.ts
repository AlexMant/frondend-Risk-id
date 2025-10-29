import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentossolicitudFormComponent } from './componentes/documentos-solicitud-form/documentos-solicitud-form.component';
import { DocumentossolicitudListComponent } from './componentes/documentos-solicitud-list/documentos-solicitud-list.component';
 


@NgModule({
  declarations: [
    DocumentossolicitudListComponent,DocumentossolicitudFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  
  ],
  exports: [DocumentossolicitudListComponent,DocumentossolicitudFormComponent]
})
export class DocumentosSolicitudModule { }
