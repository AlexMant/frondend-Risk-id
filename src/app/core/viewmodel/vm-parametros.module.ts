import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VmParametrosService } from './vm-parametros.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VmParametrosModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: VmParametrosModule,
      providers: [VmParametrosService],
    };
  }
}
