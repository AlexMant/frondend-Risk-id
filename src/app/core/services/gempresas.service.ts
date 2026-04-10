import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  GEmpresasService extends BaseService {

  /**
 * Obtiene todas las empresas.
 * @returns Observable con la lista de empresas.
 */
  getall(): Observable<any> {
    
    return this.httpGet('/holdings');
  }

  /**
   * Obtiene una empresa por ID.
   * @param id ID de la empresa.
 
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/holdings/' + id);
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
    return this.httpPost('/holdings', body);
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
    return this.httpPut('/holdings/' + id, body);
  }
  /** 
   * Elimina una empresa por ID.
   * @param id ID de la empresa a eliminar.
   */

  delete(id: any): Observable<any> {
    return this.httpDelete('/holdings/' + id);
  }
 

   

    /**
   * cambiar estado a la empresa una empresa.
   * @param id ID de la empresa a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/holdings/' + id+ '/toggle-active');
  }

   /**
   * Obtiene los procesos asociados a una empresa.
   * @param id ID de la empresa.
   * @returns Observable con la lista de procesos.
   */
  getprocesosbyempresa(id: any): Observable<any> {
    console.log("id empresa servicio", id);
    return this.httpGet('/holdings?empresaId=' + id);
  }
 
  
}
