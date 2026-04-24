import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los cargos de personal con los que un incidente característico puede estar relacionado.
 * 
 */
export class CargosPersonalService  extends BaseService  {
  /** 
   * Obtiene todos los cargos personal. 
   * @returns   Observable con la lista de cargos personal.
   * */
  getall(): Observable<any> {
    return this.httpGet('/cargos-personal');
  }
  /** 
   * Obtiene un cargos personal por ID. 
   * @param   id - ID del cargos-personal a consultar.
   * @returns  Observable con los datos del cargos-personal.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/cargos-personal/'+id);
  }

  getbyparams(params:any): Observable<any> {
    return this.httpGet('/cargos-personal?'+params);
  }
  /** 
   * Crea un nuevo cargos personal.
   * @param   body - Datos del nuevo cargos personal.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del cargos personal creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/cargos-personal',body);
  }
  /**
   *  Actualiza un cargos personal existente.
   * @param   id - ID del cargos personal a actualizar.
   * @param   body - Nuevos datos del cargos personal.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del cargos personal actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/cargos-personal/'+id,body);
  }
  /** 
   * Elimina un cargos-personal por ID.
   * @param   id - ID del cargos personal a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/cargos-personal/'+id);
  }
}


