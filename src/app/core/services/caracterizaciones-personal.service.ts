import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio todas las caracterizaciones de personal con las que se puede relacionar un incidente.
 * 
 */
export class CaracterizacionesPersonalService  extends BaseService  {
  /** 
   * Obtiene todos los caracterizaciones personal. 
   * @returns   Observable con la lista de caracterizaciones personal.
   * */
  getall(): Observable<any> {
    return this.httpGet('/caracterizaciones-personal');
  }
  /** 
   * Obtiene un caracterizaciones personal por ID. 
   * @param   id - ID del caracterizaciones personal a consultar.
   * @returns  Observable con los datos del caracterizaciones personal.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/caracterizaciones-personal/'+id);
  }
  /** 
   * Crea un nuevo caracterizaciones personal.
   * @param   body - Datos del nuevo caracterizaciones personal.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del caracterizaciones personal creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/caracterizaciones-personal',body);
  }
  /**
   *  Actualiza un caracterizaciones personal existente.
   * @param   id - ID del caracterizaciones personal a actualizar.
   * @param   body - Nuevos datos del caracterizaciones personal.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del caracterizaciones personal actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/caracterizaciones-personal/'+id,body);
  }
  /** 
   * Elimina un caracterizaciones personal por ID.
   * @param   id - ID del caracterizaciones personal a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/caracterizaciones-personal/'+id);
  }
}


