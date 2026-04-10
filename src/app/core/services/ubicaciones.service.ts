import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todas las ubicaciones con las que un incidente puede estar relacionado.
 */

export class UbicacionesService  extends BaseService  {
  /** 
   * Obtiene todos los ubicaciones. 
   * @returns   Observable con la lista de ubicaciones.
   * */
  getall(): Observable<any> {
    return this.httpGet('/ubicaciones');
  }
  /** 
   * Obtiene un ubicaciones por ID. 
   * @param   id - ID del ubicaciones a consultar.
   * @returns  Observable con los datos del ubicaciones.
   */
   getbyparams(params:any): Observable<any> {
    return this.httpGet('/ubicaciones'+params);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/ubicaciones/'+id);
  }
  /** 
   * Crea un nuevo ubicaciones.
   * @param   body - Datos del nuevo ubicaciones.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del ubicaciones creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/ubicaciones',body);
  }
  /**
   *  Actualiza un ubicaciones existente.
   * @param   id - ID del ubicaciones a actualizar.
   * @param   body - Nuevos datos del ubicaciones.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del ubicaciones actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/ubicaciones/'+id,body);
  }
  /** 
   * Elimina un ubicaciones por ID.
   * @param   id - ID del ubicaciones a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/ubicaciones/'+id);
  }
}


