import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent implements OnInit {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }
  @ViewChild('file') elInputFile: ElementRef;
  @Input() cargados: any = 0;
  @Input() icon: string = 'description';
  @Input() label: string = '';
  @Input() folder: string;
  @Input("contenedor-id") contenedorid: string;
  @Input("tipo-doc") id_tipo_doc: string;
  fileName: String = '';

  ngOnInit(): void { }


  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let filesToUpload: File[] = files;
    const formData = new FormData();
    formData.append('folder', this.folder);
    formData.append('contenedorid', this.contenedorid);

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.httpClient.post(this.baseUrl + 'api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(
        {
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Carga Completa.';
              this.elInputFile.nativeElement.value = '';
              this.onUploadFinished.emit({ id_tipo_doc: this.id_tipo_doc, Documentos: event.body });
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
  }
}
