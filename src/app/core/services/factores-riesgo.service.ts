import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los factores de riesgo con los que un incidente puede estar relacionado.
 */

export class FactoresRiesgoService   extends BaseService  {
  /** 
   * Obtiene todos los Factores de riesgo. 
   * @returns   Observable con la lista de Factores de riesgo.
   * */
  getall(): Observable<any> {
    return this.httpGet('/factores-riesgo');
  }
  /** 
   * Obtiene un peligro adicional por ID. 
   * @param   id - ID del peligro adicional a consultar.
   * @returns  Observable con los datos del peligro adicional.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/factores-riesgo/'+id);
  }
  /** 
   * Crea un nuevo Factores de riesgo.
   * @param   body - Datos del nuevo  Factores de riesgo.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del Factores de riesgo creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/factores-riesgo',body);
  }
  /**
   *  Actualiza un  Factores de riesgo existente.
   * @param   id - ID del  Factores de riesgo a actualizar.
   * @param   body - Nuevos datos del  Factores de riesgo.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del peligro adicional actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/factores-riesgo/'+id,body);
  }
  /** 
   * Elimina un  factores-riesgo por ID.
   * @param   id - ID del  Factores de riesgo a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/factores-riesgo/'+id);
  }
}



