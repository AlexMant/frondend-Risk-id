import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de tareas.
 */
@Injectable({
  providedIn: 'root'
})
export class TareasService extends BaseService {

  /**
   *  Obtiene todas las tareas. 
   *  @returns Observable con la lista de tareas.
   * */
  getall(): Observable<any> {
    return this.httpGet('/tareas');
  }

  getallparams(paramsString: string = ''): Observable<any> {


    if (paramsString == '') {

      return this.httpGet('/tareas');
    } else {
      return this.httpGet('/tareas?' + paramsString);
    }

  }

  /**
   *  Obtiene una tarea por ID.
   *  @param id ID de la tarea a obtener.
   *  @returns Observable con los datos de la tarea.
   * */
  getid(id: any): Observable<any> {
    return this.httpGet('/tareas/' + id);
  }
  /**
   *  Crea una nueva tarea.
   *  @param body Datos de la nueva tarea.
   * parameters del body
   * nombre: string
   * tipo: integer
   * n_orden: string
   * subProcesoId: integer
   *  @returns Observable con los datos de la tarea creada.
    */
  post(body: any): Observable<any> {
    return this.httpPost('/tareas', body);
  }

  /** 
   * Actualiza una tarea existente.
   * @param id ID de la tarea a actualizar.
   * @param body datos de la tarea.
   * parameters del body
   * nombre: string
   * tipo: integer
   * n_orden: string
   * @returns Observable con los datos de la tarea actualizada.
   */
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/tareas/' + id, body);
  }

  /** 
   * Elimina una tarea por ID. 
   * @param id ID de la tarea a eliminar.
   * @returns Observable con los datos de la tarea eliminada.
   */
  delete(id: any): Observable<any> {
    return this.httpDelete('/tareas/' + id);
  }

  /** 
   * Obtiene los incidentes asociados a una tarea específica.
   * @param id ID de la tarea.
   * @returns Observable con la lista de incidentes asociados a la tarea.
   */
  getallindicentesbytarea(id: any): Observable<any> {
    return this.httpGet('/tareas/' + id + '/incidentes');
  }




  tree(id: any): Observable<any> {
    return this.httpGet('/tareas/' + id + '/tree');
  }
  restore(id: any): Observable<any> {
    return this.httpGet('/tareas/' + id + '/restore');
  }



  /**
 * cambiar estado al subproceso.
 * @param id ID del subproceso a activar.
 */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/tareas/' + id + '/toggle-active');
  }
}
