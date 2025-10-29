import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los áreas con las que un incidente puede estar relacionado.
 */

export class AreasService   extends BaseService  {
  /** 
   * Obtiene todos los areas. 
   * @returns   Observable con la lista de areas.
   * */
  getall(): Observable<any> {
    return this.httpGet('/areas');
  }
  /** 
   * Obtiene un areas por ID. 
   * @param   id - ID del areas a consultar.
   * @returns  Observable con los datos del areas.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/areas/'+id);
  }
  /** 
   * Crea un nuevo areas.
   * @param   body - Datos del nuevo areas.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del areas creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/areas',body);
  }
  /**
   *  Actualiza un areas existente.
   * @param   id - ID del areas a actualizar.
   * @param   body - Nuevos datos del areas.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del areas actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/areas/'+id,body);
  }
  /** 
   * Elimina un areas por ID.
   * @param   id - ID del areas a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/areas/'+id);
  }
}


