import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  TempHardwareService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Temphardware');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Temphardware/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Temphardware',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Temphardware/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Temphardware/'+id);
  }

  inscargaexcel(body:any): Observable<any> {
    return this.httpPost('api/Temphardware/inscargaexcel',body);
  }

}