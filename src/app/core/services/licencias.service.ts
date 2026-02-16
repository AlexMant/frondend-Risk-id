import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  LicenciasService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/licencias');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/licencias/'+id);
  }
       getbyparams(params: any): Observable<any> {
    return this.httpGet('/licencias' + params);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/licencias',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/licencias/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/licencias/'+id);
  }

   

}