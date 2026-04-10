import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';


/**
 * Servicio para la gestión de informes.
 * Permite realizar operaciones para la generación de informes.
 */

@Injectable({
  providedIn: 'root'
})
export class InformesService extends BaseService {


  /**
  *Resumen de estadisiticas simples para SST
  * @param   params - Parámetros de consulta para filtrar o paginar los resultados.
  * @returns   Observable con las estadisticas simples para SST.
  */
  getSstSummary(params: any): Observable<any> {

    return this.httpGet('/informes/sst/summary' + params);
  }

  /**
*Evolucion mensual del valor del indicador elegido
* @param   params - Parámetros de consulta para filtrar o paginar los resultados.
* @returns   Observable con las estadisticas simples para SST.
*/
  getSstIndicadorMensual(params: any): Observable<any> {

    return this.httpGet('/informes/sst/indicador-mensual?' + params);
  }

  /**
*Accidentes por centro de trabajo
* @param   params - Parámetros de consulta para filtrar o paginar los resultados.
* @returns   Observable con los datos para la generacion de graficos.
*/
  getSstAccidentesPorCentroTrabajo(params: any): Observable<any> {

    return this.httpGet('/informes/sst/accidentes-por-centro-trabajo?' + params);
  }

  getPrecursoresPorUbicacion(params: any): Observable<any> {

    return this.httpGet('/informes/precursores/por-ubicacion?intervalo=month&' + params);
  }
   getPrecursoresPorTipos(params: any): Observable<any> {

    return this.httpGet('/informes/precursores/por-tipos?intervalo=month&' + params);
  }
  getPrecursoresListado(params: any): Observable<any> {

    return this.httpGet('/informes/precursores/listado?' + params);
  }
  getSimuladorDs(params: any): Observable<any> {

    return this.httpGet('/informes/simulador-ds67?' + params);
  }

  getMapaRiesgos(params: any): Observable<any> {

    return this.httpGet('/informes/mapa-riesgos?' + params);
  }

}
