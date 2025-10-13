import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DocumentosService } from 'src/app/core/services/documentos.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html'
})

export class DownloadFileComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject()

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  baseUrl: string;
  constructor(private httpClient: HttpClient, private documentosService: DocumentosService) {
    this.baseUrl = environment.apiUrl;
  }
  @Input() icon: string = 'download';
  @Input() label: string = '';
  @Input() origen: any;
  @Input("idbusqueda") idbusqueda: any;
  @Input("tipo-doc") id_tipo_doc: any;
  @Input() conIDdoc: any = 'N';

  @Input() iddocumento: any;
  @Input() nombre_documento: any = '';
  datadocumento: any = false;
  ngOnInit(): void {
    if (this.conIDdoc == 'N') {
      this.Search1 = {
        id_tipo_doc: this.id_tipo_doc,
        origen: this.origen,
        idbusqueda: this.idbusqueda
      }
      // console.log(this.Search1);
      this.documentosService.getBydocumentoTipoDoc(this.Search1).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        if (data.length > 0) {
          this.datadocumento = true;
        } else {
          this.datadocumento = false;
        }
      }
      );
    } else { this.datadocumento = true; }
  }

  Search1: any;
  DescargarFile() {

    if (this.conIDdoc == 'N') {
      this.sinIDdoc();
    } else {
      this.conIdDoc();
    }

  }
  conIdDoc() {

    this.documentosService.DownloadDocument(this.iddocumento, this.nombre_documento);
    this.onUploadFinished.emit(true);
  }

  sinIDdoc() {

    this.Search1 = {
      id_tipo_doc: this.id_tipo_doc,
      origen: this.origen,
      idbusqueda: this.idbusqueda
    }

    this.documentosService.getBydocumentoTipoDoc(this.Search1).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {

      if (data.length > 0) {
        this.documentosService.DownloadDocument(data[0].iddocumento, data[0].nombre_documento);
        this.onUploadFinished.emit(true);
      } else {
        this.onUploadFinished.emit(false);
      }
    }, (error) => {
      this.onUploadFinished.emit(false);
      console.log(error);
    }
    );


  }

}
