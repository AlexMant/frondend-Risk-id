import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  OpcionesnavegacionService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Opcionesnavegacion');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Opcionesnavegacion/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Opcionesnavegacion',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Opcionesnavegacion/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Opcionesnavegacion/'+id);
  }

  getmenuUsuario(id:any): Observable<any> {
     
    return this.httpGet('api/Opcionesnavegacion/menuUsuario/'+id);
  }

}
