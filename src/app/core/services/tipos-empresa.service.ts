import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para todos los tipos de empresa.
 */
export class TiposEmpresaService extends BaseService  {
  /** 
   * Obtiene todos los tipos de empresa. 
   * @returns   Observable con la lista de tipos de empresa.
   * */
  getall(): Observable<any> {
    return this.httpGet('/tipos-empresa');
  }
  /** 
   * Obtiene un tipo de empresa por ID. 
   * @param   id - ID del tipo de empresa a consultar.
   * @returns  Observable con los datos del tipo de empresa.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/tipos-empresa/'+id);
  }
  /** 
   * Crea un nuevo tipo de empresa.
   * @param   body - Datos del nuevo tipo de empresa.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de empresa creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/tipos-empresa',body);
  }
  /**
   *  Actualiza un tipo de empresa existente.
   * @param   id - ID del tipo de empresa a actualizar.
   * @param   body - Nuevos datos del tipo de empresa.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de empresa actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/tipos-empresa/'+id,body);
  }
  /** 
   * Elimina un tipo de empresa por ID.
   * @param   id - ID del tipo de empresa a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/tipos-empresa/'+id);
  }
}
