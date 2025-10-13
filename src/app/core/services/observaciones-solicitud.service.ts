import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  ObservacionessolicitudService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Observacionessolicitud');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Observacionessolicitud/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Observacionessolicitud',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Observacionessolicitud/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Observacionessolicitud/'+id);
  }

   

}