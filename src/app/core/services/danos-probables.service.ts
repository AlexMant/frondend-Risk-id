import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los daños probables con los que un incidente   puede estar relacionado.
 */

export class DanosProbablesService   extends BaseService  {
  /** 
   * Obtiene todos los daños probables. 
   * @returns   Observable con la lista de daños probables.
   * */
  getall(): Observable<any> {
    return this.httpGet('/danos-probables');
  }
  /** 
   * Obtiene un daño probable por ID. 
   * @param   id - ID del daños probables a consultar.
   * @returns  Observable con los datos del daños probables.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/danos-probables/'+id);
  }
  /** 
   * Crea un nuevo daños probables.
   * @param   body - Datos del nuevo daños probables.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del daños probables creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/danos-probables',body);
  }
  /**
   *  Actualiza un daño probable existente.
   * @param   id - ID del daño probable a actualizar.
   * @param   body - Nuevos datos del daño probable.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del daño probable actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/danos-probables/'+id,body);
  }
  /** 
   * Elimina un daño probable por ID.
   * @param   id - ID del daño probable a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/danos-probables/'+id);
  }
}


