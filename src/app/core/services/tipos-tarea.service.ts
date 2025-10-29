import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para todos los tipos de tarea.
 */
export class TiposTareaService extends BaseService  {
  /** 
   * Obtiene todos los tipos de tarea. 
   * @returns   Observable con la lista de tipos de tarea.
   * */
  getall(): Observable<any> {
    return this.httpGet('/tipos-tarea');
  }
  /** 
   * Obtiene un tipo de tarea por ID. 
   * @param   id - ID del tipo de tarea a consultar.
   * @returns  Observable con los datos del tipo de tarea.
   */
  getid(id:any): Observable<any> {
    return this.httpGet('/tipos-tarea/'+id);
  }
  /** 
   * Crea un nuevo tipo de tarea.
   * @param   body - Datos del nuevo tipo de tarea.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de tarea creado.
   */
  post(body:any): Observable<any> {
    return this.httpPost('/tipos-tarea',body);
  }
  /**
   *  Actualiza un tipo de tarea existente.
   * @param   id - ID del tipo de tarea a actualizar.
   * @param   body - Nuevos datos del tipo de tarea.
   * parameters del body
   * nombre: string
   * @returns  Observable con los datos del tipo de tarea actualizado.
   */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/tipos-tarea/'+id,body);
  }
  /** 
   * Elimina un tipo de tarea por ID.
   * @param   id - ID del tipo de tarea a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id:any): Observable<any> {
    return this.httpDelete('/tipos-tarea/'+id);
  }
}
