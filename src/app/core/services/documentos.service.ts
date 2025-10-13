import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('api/Documentos');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('api/Documentos/' + id);
  }
  post(body: any): Observable<any> {
    return this.httpPost('api/Documentos', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('api/Documentos/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('api/Documentos/' + id);
  }

  getbyidperfil(id: any): Observable<any> {
    return this.httpGet('api/Documentos/perfil/' + id);
  }
  /**
   * Trae documentos cargados relacionados a la oferta y workflow
   * @param data
   * @returns
   */
  getbyofertawf(data: any): Observable<any> {
    return this.httpPost('api/Documentos/oferta/wf', data);
  }

  getprogramacion(idoferta: any): Observable<any> {
    return this.httpGet('api/Documentos/programacion/' + idoferta);
  }

  getBydocumentoTipoDoc(data: any): Observable<any> {
    return this.httpPost('api/Documentos/tipodoc/origen', data);
  }

  getDownload(iddocumento: any): Observable<any> {
    console.log("iddocumento>getDownload", iddocumento)
    return this.documentsDownload('api/Documentos/DocumentsDownload', iddocumento);
  }
  async DownloadDocument(iddocumento: any, nombredoc: any) {


    this.getDownload(iddocumento).subscribe((event) => {


      const data = event as HttpResponse<Blob>;
      const downloadedFile = new Blob([data.body as BlobPart], {
        type: data.body?.type
      });
      // console.log("downloadedFile1", downloadedFile)
      // console.log("data1", data)
      if (downloadedFile.type == "application/octet-stream") {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = nombredoc;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }


    }, (error: any) => {
      console.log(error);

    });


  }


  getdocumentosbyoferta(idoferta: any, idperfil: any): Observable<any> {
    return this.httpGet('api/Documentos/DocumentosByOferta/' + idoferta + '/' + idperfil);
  }


  getdocumentosotrasversionesbyoferta(idoferta: any, id_tipo_doc: any, iddocumento: any, idperfil: any): Observable<any> {
    return this.httpGet('api/Documentos/DocumentosOtrasVersionesByOfertaTipo/' + idoferta + '/' + id_tipo_doc + '/' + iddocumento + '/' + idperfil);
  }


  getdocumentosallbyoferta(id: any, idperfil: any): Observable<any> {
    return this.httpGet('api/Documentos/DocumentosAllByOferta/' + id + '/' + idperfil);
  }
  getdocumentoszipbyoferta(idoferta: any, idperfil: any): Observable<any> {
    console.log("getdocumentoszipbyoferta>id", idoferta)
    return this.documentsDownloadzip('api/Documentos/DocumentosZipByOferta', idoferta);
    // return this.httpGet('api/Documentos/DocumentosZipByOferta/' + id);
  }

  async DownloadDocumentzip(idoferta: any, nombredoc: any, idperfil: any) {


    this.getdocumentoszipbyoferta(idoferta, idperfil).subscribe((event) => {


      const data = event as HttpResponse<Blob>;
      const downloadedFile = new Blob([data.body as BlobPart], {
        type: data.body?.type
      });
      // console.log("downloadedFile1", downloadedFile)
      // console.log("data1", data)
      if (downloadedFile.type == "application/zip") {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = nombredoc;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }


    }, (error: any) => {
      console.log(error);

    });


  }

}
