import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TiposLicenciaService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/tipos-licencia');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/tipos-licencia/'+id);
  }
       getbyparams(params: any): Observable<any> {
    return this.httpGet('/tipos-licencia' + params);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/tipos-licencia',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/tipos-licencia/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/tipos-licencia/'+id);
  }

   

}

