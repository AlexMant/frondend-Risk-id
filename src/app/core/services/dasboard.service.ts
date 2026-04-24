import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para operaciones y datos del dashboard.
 */
@Injectable({
  providedIn: 'root'
})
export class DasboardService extends BaseService {
   
    getgradicoUno(params:any): Observable<any> {
    return this.httpGet('/dashboard/precursores/clasificacion?intervalo=day&'+params);
  }
   getgradicoDos(params:any): Observable<any> {
    return this.httpGet('/dashboard/precursores/por-ubicacion?'+params);
  }


  getGraficotres(params:any): Observable<any> {
    return this.httpGet('/dashboard/ocurrencias/clasificacion-tiempo-perdido?intervalo=month&'+params);
  }
 
    getGraficocuarto(params:any): Observable<any> {
    return this.httpGet('/dashboard/ocurrencias/tiempo-perdido-por-ubicacion?'+params);
  }

  getcards(params: any): Observable<any> {
    return this.httpGet('/dashboard/summary?'+params);
  }
}
