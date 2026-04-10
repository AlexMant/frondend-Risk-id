import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de procesos y subprocesos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProcesosService extends BaseService {
  /** 
   * Obtiene todos los procesos. 
   * @returns Observable con la lista de procesos.
   
   */
  getall(): Observable<any> {
    return this.httpGet('/procesos');
  }

    getallparams(params: any): Observable<any> {
     
    if (params=='') {

      return this.httpGet('/procesos');
    } else {
      return this.httpGet('/procesos?' + params);
    }

  }


  /** 
   * Obtiene un proceso por ID.
   * @param id ID del proceso.
   * @returns Observable con los datos del proceso.
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/procesos/' + id);
  }
  /** 
   * Crea un nuevo proceso.
   * @param body Datos del nuevo proceso.
   * parameters del body
   * nombre: string
   * n_orden: integer
   * empresaId: integer
   */
  post(body: any): Observable<any> {
    return this.httpPost('/procesos', body);
  }

  /** 
   * Actualiza un proceso existente.
   * @param id ID del proceso a actualizar.
   * @param body Nuevos datos del proceso.
   * parameters del body
   * nombre: string
   * n_orden: integer
     * @returns Observable con la respuesta de la actualización.
   */
  put(id: any, body: any): Observable<any> {

    return this.httpPut('/procesos/' + id, body);
  }

  // /**
  //  *  Elimina un proceso por ID.
  //  * @param id ID del proceso a eliminar.
  //  * @returns Observable con la respuesta de la eliminación.
  //  */
  // delete(id: any): Observable<any> {
  //   return this.httpDelete('/procesos/' + id);
  // }
  /** 
   * Obtiene los subprocesos de un proceso específico.
   * @param id ID del proceso.
   * @returns Observable con la lista de subprocesos asociados al proceso.
     */
  // getbyprocesos(id: any): Observable<any> {
  //   return this.httpGet('/procesos/' + id + '/subprocesos');
  // }

   getbyprocesossubytareas(id: any): Observable<any> {
 
    return this.httpGet('/procesos/' + id + '/tree');
  }

      /**
   * cambiar estado a un procesos
   * @param id ID del proceso a activar o desactivar
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/procesos/' + id + '/toggle-active');
  }

}




