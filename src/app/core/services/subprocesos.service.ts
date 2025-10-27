import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubprocesosService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/API-DEV/web/subprocesos');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/API-DEV/web/subprocesos/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/API-DEV/web/subprocesos',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/API-DEV/web/subprocesos/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/API-DEV/web/subprocesos/'+id);
  }

   

}
