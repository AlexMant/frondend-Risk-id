import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemsAddComponent } from './componentes/items-add/items-add.component';
import { ItemsEditComponent } from './componentes/items-edit/items-edit.component';
import { ItemsFormComponent } from './componentes/items-form/items-form.component';
import { ItemsListComponent } from './componentes/items-list/items-list.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    ItemsAddComponent,
    ItemsEditComponent,
    ItemsFormComponent
    ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ItemsModule { }
