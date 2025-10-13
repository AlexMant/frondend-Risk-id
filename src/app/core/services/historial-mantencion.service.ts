import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  HistorialmantencionService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Historialmantencion');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Historialmantencion/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Historialmantencion',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Historialmantencion/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Historialmantencion/'+id);
  }

   

}