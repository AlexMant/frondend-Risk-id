import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class EvaluacionesService extends BaseService {

  /** 
  * Crea un una nueva evaluacion
  * @param   body - Datos de la nueva evaluacion.
  * parameters del body = {
                              "incidenteCaracterizadoId": 1,
                              "probabilidadRResidualId": 1,
                              "consecuenciaRResidualId": 1,
                              "probabilidadRPuroId": 1,
                              "consecuenciaRPuroId": 1,
                              "esSistema": true
                          }

  * @returns  Observable con los datos de la evaluacion actualizada.
  */
  put(body: any): Observable<any> {
    return this.httpPut('/evaluaciones', body);
  }


  getallparams(params: any): Observable<any> {

    if (params == '') {

      return this.httpGet('/evaluaciones');
    } else {
      return this.httpGet('/evaluaciones?' + params);
    }

  }

}
