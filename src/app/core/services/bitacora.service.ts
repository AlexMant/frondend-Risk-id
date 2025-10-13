import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  BitacoraService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Bitacora');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Bitacora/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Bitacora',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Bitacora/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Bitacora/'+id);
  }

   

}
