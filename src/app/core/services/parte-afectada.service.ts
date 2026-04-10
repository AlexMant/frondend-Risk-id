import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParteAfectadaService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/parte-afectada');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/parte-afectada/' + id);
  }
  getbyparams(params: any): Observable<any> {
    return this.httpGet('/parte-afectada' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/parte-afectada', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/parte-afectada/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/parte-afectada/' + id);
  }



}