import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/asistencia');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/asistencia/' + id);
  }
  getbyparams(params: any): Observable<any> {
    return this.httpGet('/asistencia' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/asistencia', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/asistencia/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/asistencia/' + id);
  }



}
