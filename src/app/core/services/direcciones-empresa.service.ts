import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  DireccionesempresaService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Direccionesempresa');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Direccionesempresa/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Direccionesempresa',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Direccionesempresa/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Direccionesempresa/'+id);
  }

   

}
