import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/API-DEV/web/procesos');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/API-DEV/web/procesos/'+id);
  }
  getbyprocesos(id:any): Observable<any> {
    return this.httpGet('/API-DEV/web/procesos/'+id+'/subprocesos');
  }
  post(body:any): Observable<any> {
    return this.httpPost('/API-DEV/web/procesos',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/API-DEV/web/procesos/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/API-DEV/web/procesos/'+id);
  }

   

}

