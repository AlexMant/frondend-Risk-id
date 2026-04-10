import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de tipos de usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService extends BaseService  {
  /** 
   * Obtiene todos los tipos de usuario. 
   * @returns   Observable con la lista de tipos de usuario.
   * */
  getall(): Observable<any> {
    return this.httpGet('/roles');
  }
  /** 
   * Obtiene un tipo de usuario por ID. 
   * @param   id - ID del tipo de usuario a consultar.
   * @returns  Observable con los datos del tipo de usuario.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/roles/'+id);
  }
  /** 
   * Crea un nuevo tipo de usuario.
   * @param   body - Datos del nuevo tipo de usuario.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de usuario creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/roles',body);
  }
  /**
   *  Actualiza un tipo de usuario existente.
   * @param   id - ID del tipo de usuario a actualizar.
   * @param   body - Nuevos datos del tipo de usuario.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de usuario actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/roles/'+id,body);
  }
  /** 
   * Elimina un tipo de usuario por ID.
   * @param   id - ID del tipo de usuario a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/roles/'+id);
  }
}
