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
   
  getGraficoUno(): Observable<any> {
    return this.httpGet('/dashboard/ocurrencias-anormales?intervalo=month');
  }
}
