import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  HistorialhardwareService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Historialhardware');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Historialhardware/'+id);
  }
  getIdHardware(id:any): Observable<any> {
    return this.httpGet('api/Historialhardware/hardware/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Historialhardware',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Historialhardware/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Historialhardware/'+id);
  }

   

}
