import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  DireccionesusuariosService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Direccionesusuarios');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Direccionesusuarios/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Direccionesusuarios',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Direccionesusuarios/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Direccionesusuarios/'+id);
  }

   

}