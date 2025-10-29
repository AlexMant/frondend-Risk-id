import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para todos los peligros adicionales con los que un incidente puede estar relacionado.
 */
export class PeligrosAdicionalesService  extends BaseService  {
  /** 
   * Obtiene todos los peligros adicionales. 
   * @returns   Observable con la lista de peligros adicionales.
   * */
  getall(): Observable<any> {
    return this.httpGet('/peligros-adicionales');
  }
  /** 
   * Obtiene un peligro adicional por ID. 
   * @param   id - ID del peligro adicional a consultar.
   * @returns  Observable con los datos del peligro adicional.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/peligros-adicionales/'+id);
  }
  /** 
   * Crea un nuevo peligros-adicionales.
   * @param   body - Datos del nuevo  peligros adicionales.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del peligro adicional creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/peligros-adicionales',body);
  }
  /**
   *  Actualiza un  peligros adicionales existente.
   * @param   id - ID del  peligros adicionales a actualizar.
   * @param   body - Nuevos datos del  peligros adicionales.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del peligro adicional actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/peligros-adicionales/'+id,body);
  }
  /** 
   * Elimina un  peligros-adicionales por ID.
   * @param   id - ID del  peligros adicionales a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/peligros-adicionales/'+id);
  }
}


