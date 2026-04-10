import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TiposDanoService extends BaseService {


  getall(): Observable<any> {
    return this.httpGet('/tipos-dano');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/tipos-dano/' + id);
  }
  getbyparams(params: any): Observable<any> {

    return this.httpGet('/tipos-dano?' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/tipos-dano', body);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/tipos-dano/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/tipos-dano/' + id);
  }


}
