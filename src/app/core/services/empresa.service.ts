import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de empresas y operaciones relacionadas.
 */
@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService {

  /**
 * Obtiene todas las empresas.
 * @returns Observable con la lista de empresas.
 */
  getall(): Observable<any> {
    
    return this.httpGet('/empresas');
  }

  /**
   * Obtiene una empresa por ID.
   * @param id ID de la empresa.
 
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/empresas/' + id);
  }
  /** 
   * Crea una nueva empresa.
   * @param body Datos de la nueva empresa.
   * parameters del body 
   * nombre: string
   * rut: string
   * estado: string
   * observaciones: string
   * codigo: string
   */
  post(body: any): Observable<any> {
    return this.httpPost('/empresas', body);
  }
  /** 
   * Actualiza una empresa existente.
   * @param id ID de la empresa a actualizar.
   * @param body Nuevos datos de la empresa.
   * parameters del body
   * nombre: string
   * rut: string
   * estado: string
   * observaciones: string
   * codigo: string
   */
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/empresas/' + id, body);
  }
  /** 
   * Elimina una empresa por ID.
   * @param id ID de la empresa a eliminar.
   */

  delete(id: any): Observable<any> {
    return this.httpDelete('/empresas/' + id);
  }
 

  /**
   * Activa una empresa.
   * @param id ID de la empresa a activar.
   */
  activar(id: any): Observable<any> {
    return this.httpDelete('/empresas/activar/' + id);
  }
  /**
   * Desactiva una empresa.
   * @param id ID de la empresa a desactivar.
   */
  desactivar(id: any): Observable<any> {
    return this.httpDelete('/empresas/desactivar/' + id);
  }

   /**
   * Obtiene los procesos asociados a una empresa.
   * @param id ID de la empresa.
   * @returns Observable con la lista de procesos.
   */
  getprocesosbyempresa(id: any): Observable<any> {
    return this.httpGet('/empresas/' + id + '/procesos');
  }
  
}
