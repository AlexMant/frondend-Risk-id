import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para la gestión de incidentes.
 * Permite realizar operaciones CRUD sobre incidentes.
 */
@Injectable({
  providedIn: 'root'
})
export class IncidentesService extends BaseService  {
  /**
   * Obtiene todos los incidentes registrados en el sistema.
   * @returns   Observable con la lista de incidentes.
   */
  getall(): Observable<any> {
    return this.httpGet('/incidentes');
  }

  /**
   * Obtiene un incidente específico por su ID.
   * @param   id - ID del incidente a consultar.
   * @returns  Observable con los datos del incidente.
   */
  getid(id: any): Observable<any> {
    return this.httpGet('/incidentes/' + id);
  }

  /**
   * Crea un nuevo incidente.
   * @param   body - Datos del incidente a crear.
   * parameters del body
   * nombre: string
   * estado: string
   * riesgoId: number asociado a riesgo
   * ubicacionId: number asociado a ubicacion
   * peligroAdicionalIds: number asociados a peligros adicionales
   * rutina : string
   * areaId: number asociado a area
   * factoresRiesgoIds: number[] asociados a factores de riesgo
   * peligrosIds: number[] asociados a peligros.
   * tareasIds: number[] asociados a tareas.
   * @returns   Observable con los datos del incidente creado.
   */
  post(body: any): Observable<any> {
    return this.httpPost('/incidentes', body);
  }

  /**
   * Actualiza un incidente existente.
   * @param   id - ID del incidente a actualizar.
   * @param   body - Datos actualizados del incidente.
   * parameters del body
   * nombre: string
   * estado: string
   * riesgoId: number asociado a riesgo
   * ubicacionId: number asociado a ubicacion
   * peligroAdicionalIds: number asociados a peligros adicionales
   * rutina : string
   * areaId: number asociado a area
   * factoresRiesgoIds: number[] asociados a factores de riesgo
   * peligrosIds: number[] asociados a peligros.
   * @returns   Observable con los datos del incidente actualizado.
   */
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/incidentes/' + id, body);
  }

  /**
   * Elimina un incidente por su ID.
   * @param   id - ID del incidente a eliminar.
   * @returns  Observable con la respuesta de la eliminación.
   */
  delete(id: any): Observable<any> {
    return this.httpDelete('/incidentes/' + id);
  }


  
  /**
   * lista todas las entidades con las que está relacionado un incidente y las envía en un json: Peligros, riesgos, ubicaciones, peligros
   * adicionales, factores de riesgo, áreas
   * @param   id - ID del incidente a consultar
   * @returns  Observable con la respuesta del json con toda la información.
   */
  getlookupincidentes(id: any): Observable<any> {
    return this.httpGet('/lookup/incidentes/' + id);
  }

      tree(id: any): Observable<any> {
    return this.httpGet('/incidentes/' + id + '/tree');
  }
   restore(id: any): Observable<any> {
    return this.httpGet('/incidentes/' + id + '/restore');
  }


  
    /**
   * cambiar estado al subproceso.
   * @param id ID del subproceso a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/incidentes/' + id+ '/toggle-active');
  }
}
