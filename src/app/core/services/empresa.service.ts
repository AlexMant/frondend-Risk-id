import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpResponse } from '@angular/common/http';
/**
 * Servicio para gestión de empresas y operaciones relacionadas.
 */
@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService {

  /**
 * Obtiene todas las empresas.
 * @returns Observable con la lista de empresas.
 */
  getall(): Observable<any> {
    
    return this.httpGet('/empresas');
  }

  /**
   * Obtiene una empresa por ID.
   * @param id ID de la empresa.
 
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/empresas/' + id);
  }
  /** 
   * Crea una nueva empresa.
   * @param body Datos de la nueva empresa.
   * parameters del body 
   * nombre: string
   * rut: string
   * estado: string
   * observaciones: string
   * codigo: string
   */
  post(body: any): Observable<any> {
    return this.httpPost('/empresas', body);
  }
  /** 
   * Actualiza una empresa existente.
   * @param id ID de la empresa a actualizar.
   * @param body Nuevos datos de la empresa.
   * parameters del body
   * nombre: string
   * rut: string
   * estado: string
   * observaciones: string
   * codigo: string
   */
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/empresas/' + id, body);
  }
  /** 
   * Elimina una empresa por ID.
   * @param id ID de la empresa a eliminar.
   */

  delete(id: any): Observable<any> {
    return this.httpDelete('/empresas/' + id);
  }
 

   

    /**
   * cambiar estado a la empresa una empresa.
   * @param id ID de la empresa a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/empresas/' + id+ '/toggle-active');
  }

   /**
   * Obtiene los procesos asociados a una empresa.
   * @param id ID de la empresa.
   * @returns Observable con la lista de procesos.
   */
  getprocesosbyempresa(id: any): Observable<any> {
    console.log("id empresa servicio", id);
    return this.httpGet('/procesos?empresaId=' + id);
  }


  
  async DownloadDocument(idempresa: any,nombreEmpresa:any) {

    let urlparams = '/empresas/' + idempresa + '/export';
    this.docZip(urlparams).subscribe({
      next: (event) => {
        const data = event as HttpResponse<Blob>;
        console.log("data", data);
        const contentType = data.body?.type;
        // Solo descargar si es Excel
        if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          const contentDisposition = data.headers?.get('content-disposition');
          let filename = 'IPER_' + nombreEmpresa + '.xlsx';
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^";]+)"?/);
            if (match && match[1]) {
              filename = decodeURIComponent(match[1]);
            }
          }
          const downloadedFile = new Blob([data.body as BlobPart], {
            type: contentType
          });
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = filename;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
        }
        //  else {
        //   console.log('Archivo ignorado por Content-Type:', contentType);
        // }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
}
