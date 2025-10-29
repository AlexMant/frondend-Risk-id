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
  /**
   * Obtiene datos IT del usuario.
   * @param id ID del usuario.
   */
  getmissdatosit(id:any): Observable<any> {
    return this.httpGet('/Dashboard/getmissdatosit/'+id);
  }

  /**
   * Obtiene datos admin del usuario.
   * @param id ID del usuario.
   */
  getmisdatosadmin(id:any): Observable<any> {
    return this.httpGet('/Dashboard/getmisdatosadmin/'+id);
  }

  /**
   * Obtiene datos de gráfico IT.
   * @param id ID del usuario.
   */
  graficoit(id:any): Observable<any> {
    return this.httpGet('/Dashboard/graficoit/'+id);
  }

  /**
   * Obtiene datos de gráfico admin.
   * @param id ID del usuario.
   */
  getgraficoadmin(id:any): Observable<any> {
    return this.httpGet('/Dashboard/getgraficoadmin/'+id);
  }
}
