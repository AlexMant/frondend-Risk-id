import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  BodegasService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Bodegas');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Bodegas/'+id);
  }
  post(body:any): Observable<any> {
    console.log(body);
    return this.httpPost('api/Bodegas',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Bodegas/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Bodegas/'+id);
  }

  activar(id:any): Observable<any> {
    return this.httpDelete('api/Bodegas/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('api/Bodegas/desactivar/'+id);
  }

   

}
