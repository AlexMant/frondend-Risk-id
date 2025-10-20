import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HardwareRoutingModule } from './hardware-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HardwareAddComponent } from './componentes/hardware-add/hardware-add.component';
import { HardwareEditComponent } from './componentes/hardware-edit/hardware-edit.component';
import { HardwareFormComponent } from './componentes/hardware-form/hardware-form.component';
import { HardwareListComponent } from './componentes/hardware-list/hardware-list.component';
import { HistorialHardModalListComponent } from './componentes/historial-hard-modal-list/historial-hard-modal-list.component';
import { MisBodegasModalLlistComponent } from './componentes/mis-bodegas-modal-llist/mis-bodegas-modal-llist.component';
import { AsignarUsuarioComponent } from './componentes/asignar-usuario/asignar-usuario.component';
import { ModalCargaXlsComponent } from './componentes/modal-carga-xls/modal-carga-xls.component';
import { ExportxlsService } from 'src/app/core/services/exportxls.service';


@NgModule({
  declarations: [HardwareListComponent,
    HardwareAddComponent,
    HardwareEditComponent,
    HardwareFormComponent,
    HistorialHardModalListComponent,
    MisBodegasModalLlistComponent,
    AsignarUsuarioComponent,
    ModalCargaXlsComponent


  ],
  imports: [
    CommonModule,
    HardwareRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ExportxlsService],
})
export class HardwareModule { }
