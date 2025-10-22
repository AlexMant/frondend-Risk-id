import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/API-DEV/web/incidentes');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/API-DEV/web/incidentes/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/API-DEV/web/incidentes',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/API-DEV/web/incidentes/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/API-DEV/web/incidentes/'+id);
  }

   

}
