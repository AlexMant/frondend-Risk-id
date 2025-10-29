import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los peligros con los que un incidente puede estar relacionado.
 */

export class PeligrosService extends BaseService  {
  /** 
   * Obtiene todos los peligros. 
   * @returns   Observable con la lista de peligros.
   * */
  getall(): Observable<any> {
    return this.httpGet('/peligros');
  }
  /** 
   * Obtiene un peligros por ID. 
   * @param   id - ID del peligros a consultar.
   * @returns  Observable con los datos del peligros.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/peligros/'+id);
  }
  /** 
   * Crea un nuevo peligros.
   * @param   body - Datos del nuevo peligros.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del peligros creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/peligros',body);
  }
  /**
   *  Actualiza un peligros existente.
   * @param   id - ID del peligros a actualizar.
   * @param   body - Nuevos datos del peligros.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del peligros actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/peligros/'+id,body);
  }
  /** 
   * Elimina un peligros por ID.
   * @param   id - ID del peligros a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/peligros/'+id);
  }
}
