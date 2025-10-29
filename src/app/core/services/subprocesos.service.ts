import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de subprocesos.
 */
@Injectable({
  providedIn: 'root'
})
export class SubprocesosService extends BaseService {

  /** 
   * Obtiene todos los subprocesos. 
   * @returns Observable con la lista de subprocesos.
   */
  getall(): Observable<any> {
    return this.httpGet('/subprocesos');
  }

  /**
   *  Obtiene un subproceso por ID. 
   * @param id ID del subproceso.
   * @returns Observable con los datos del subproceso.
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/subprocesos/' + id);
  }


  /** 
   * Crea un nuevo subproceso.
   * @param body Datos del nuevo subproceso.
   * parameters del body
   * nombre: string
   * n_orden: integer
   * detalles: string
   * procesoId: integer
   */
  post(body: any): Observable<any> {
    return this.httpPost('/subprocesos', body);
  }

  /** 
   * Actualiza un subproceso existente.
   * @param id ID del subproceso a actualizar.
   * @param body Nuevos datos del subproceso.
   * parameters del body
   * id: integer
   * nombre: string
   * n_orden: integer
   * detalles: string
 
   *  */
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/subprocesos/' + id, body);
  }
  /**
   * Elimina un subproceso por ID.
   * @param id ID del subproceso a eliminar.
   */
  delete(id: any): Observable<any> {
    return this.httpDelete('/subprocesos/' + id);
  }
}
