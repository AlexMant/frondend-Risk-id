import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TareasService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/API-DEV/web/tareas');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/API-DEV/web/tareas/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/API-DEV/web/tareas',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/API-DEV/web/tareas/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/API-DEV/web/tareas/'+id);
  }

   

}
