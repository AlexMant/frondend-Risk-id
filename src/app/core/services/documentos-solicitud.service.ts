import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  DocumentossolicitudService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Documentossolicitud');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Documentossolicitud/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Documentossolicitud',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Documentossolicitud/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Documentossolicitud/'+id);
  }

  getdocbyempresa(id:any): Observable<any> {
    return this.httpGet('api/Documentossolicitud/getdocbyempresa/'+id);
  }

}
