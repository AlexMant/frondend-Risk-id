import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  AsignacionesHardwareService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/AsignacionesHardware');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/AsignacionesHardware/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/AsignacionesHardware',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/AsignacionesHardware/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/AsignacionesHardware/'+id);
  }

  insasignacion(body:any): Observable<any> {
    console.log("insasignacion",body)
    return this.httpPost('api/AsignacionesHardware/insasignacion',body);
  }

  informeasignacion(body:any): Observable<any> {
    console.log("body",body)
    return this.httpPost('api/AsignacionesHardware/informeasignacion',body);
  }
  getasignacionbyuser(id:any): Observable<any> {
    return this.httpGet('api/AsignacionesHardware/asignacionuser/'+id);
  }

}