import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsecuenciasService extends BaseService   {

getall(): Observable<any> {
    return this.httpGet('/consecuencias');
  }
  getallbyempresa(empresaId:any): Observable<any> {
    return this.httpGet('/consecuencias?empresaId='+empresaId);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/consecuencias/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/consecuencias',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/consecuencias/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/consecuencias/'+id);
  }
 
}
