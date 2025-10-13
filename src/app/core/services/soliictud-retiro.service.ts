import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  SoliictudretiroService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Soliictudretiro');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Soliictudretiro/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Soliictudretiro',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Soliictudretiro/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Soliictudretiro/'+id);
  }
  insertasolicitudretiro(body:any): Observable<any> {
    return this.httpPost('api/Soliictudretiro/insertasolicitudretiro',body);
  }
  getconsultaretiros(body:any): Observable<any> {
    return this.httpPost('api/Soliictudretiro/getconsultaretiros',body);
  }

  cambiaestado(id:any): Observable<any> {
    return this.httpDelete('api/Soliictudretiro/cambiaestado/'+id);
  }

}
