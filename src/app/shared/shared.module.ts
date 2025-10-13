import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { TitlePageComponent } from './title-page/title-page.component';
import { TableComponent } from './table/table.component';
import { ContainerComponent } from './container/container.component';
import { BlockComponent } from './block/block.component';
import { BtnsActionsComponent } from './btns-actions/btns-actions.component';
import { DataComponent } from './data/data.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { HeaderComponent } from './header/header.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
 
import { ColComponent } from './col/col.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterComponent } from './footer/footer.component';
import { FormatPipe } from '../core/pipes/format.pipe';
import { IndicatorAuditorComponent } from './indicator-auditor/indicator-auditor.component';
import { DoubleScrollComponent } from './Double-Scroll/Double-Scroll.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { ContainerNooverComponent } from './container-noover/container-noover.component';
import { MatPaginatorGotoComponent } from './mat-paginator-goto/mat-paginator-goto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FootersimpleComponent } from './footersimple/footersimple.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [
    NoticeComponent,
    NavMenuComponent,
    TitlePageComponent,
    TableComponent,
    ContainerComponent,
    ContainerNooverComponent,
    BlockComponent,
    BtnsActionsComponent,
    DataComponent,
    IndicatorComponent,
    IndicatorAuditorComponent,
    HeaderComponent,
    HeaderModalComponent,
    UploadFileComponent,
    ColComponent,
    PreloaderComponent,
    FooterComponent,
    FormatPipe,
    DoubleScrollComponent,
    DownloadFileComponent,
    MatPaginatorGotoComponent,
    FootersimpleComponent,
    MenuHeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,

    ReactiveFormsModule,

    FormsModule,
  ],
  exports: [
    NoticeComponent,
    NavMenuComponent,
    TitlePageComponent,
    TableComponent,
    ContainerComponent,
    ContainerNooverComponent,
    BlockComponent,
    BtnsActionsComponent,
    DataComponent,
    IndicatorComponent,
    IndicatorAuditorComponent,
    HeaderComponent,
    HeaderModalComponent,
    UploadFileComponent,
    ColComponent,
    PreloaderComponent,
    FooterComponent,
    DoubleScrollComponent,
    DownloadFileComponent,
    FootersimpleComponent,
    MenuHeaderComponent
  ]
})
export class SharedModule { }
