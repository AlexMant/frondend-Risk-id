import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TiposOcurrenciasService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/tipos-Ocurrencias');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/tipos-Ocurrencias/'+id);
  }
       getbyparams(params: any): Observable<any> {
    return this.httpGet('/tipos-Ocurrencias' + params);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/tipos-Ocurrencias',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/tipos-Ocurrencias/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/tipos-Ocurrencias/'+id);
  }

   

}
