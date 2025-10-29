import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los riesgos con los que un incidente puede estar relacionado.
 */

export class RiesgosService extends BaseService  {
  /** 
   * Obtiene todos los riesgos. 
   * @returns   Observable con la lista de riesgos.
   * */
  getall(): Observable<any> {
    return this.httpGet('/riesgos');
  }
  /** 
   * Obtiene un riesgos por ID. 
   * @param   id - ID del riesgos a consultar.
   * @returns  Observable con los datos del riesgos.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/riesgos/'+id);
  }
  /** 
   * Crea un nuevo riesgos.
   * @param   body - Datos del nuevo riesgos.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del riesgos creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/riesgos',body);
  }
  /**
   *  Actualiza un riesgos existente.
   * @param   id - ID del riesgos a actualizar.
   * @param   body - Nuevos datos del riesgos.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del riesgos actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/riesgos/'+id,body);
  }
  /** 
   * Elimina un riesgos por ID.
   * @param   id - ID del riesgos a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/riesgos/'+id);
  }
}

