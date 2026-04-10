import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/trabajadores');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/trabajadores/' + id);
  }
  getbyparams(params: any): Observable<any> {
    return this.httpGet('/trabajadores' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/trabajadores', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/trabajadores/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/trabajadores/' + id);
  }



}
