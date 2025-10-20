import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CotizacionListComponent } from './componentes/cotizacion-list/cotizacion-list.component';
import { CotizacionAddComponent } from './componentes/cotizacion-add/cotizacion-add.component';
import { CotizacionEditComponent } from './componentes/cotizacion-edit/cotizacion-edit.component';
import { ObservacionesSolicitudModule } from '../observaciones-solicitud/observaciones-solicitud.module';
import { ListHardwareNewCotizacionComponent } from './componentes/list-hardware-new-cotizacion/list-hardware-new-cotizacion.component';
import { FormHardwareNewCotizacionComponent } from './componentes/form-hardware-new-cotizacion/form-hardware-new-cotizacion.component';
import { CotizacionEditAdminComponent } from './componentes/cotizacion-edit-admin/cotizacion-edit-admin.component';
import { BitacoraModule } from '../bitacora/bitacora.module';
import { DocumentosSolicitudModule } from '../documentos-solicitud/documentos-solicitud.module';


@NgModule({
  declarations: [
    CotizacionListComponent
    ,CotizacionAddComponent
    ,CotizacionEditComponent
    ,ListHardwareNewCotizacionComponent
    ,FormHardwareNewCotizacionComponent
    ,CotizacionEditAdminComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CotizacionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ObservacionesSolicitudModule,
    BitacoraModule,
    DocumentosSolicitudModule
  ]
})
export class CotizacionModule { }
