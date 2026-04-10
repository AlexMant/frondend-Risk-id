import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class RiesgosSusesoService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/riesgos-suseso');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/riesgos-suseso/' + id);
  }
  getbyparams(params: any): Observable<any> {
    return this.httpGet('/riesgos-suseso' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/riesgos-suseso', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/riesgos-suseso/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/riesgos-suseso/' + id);
  }



}