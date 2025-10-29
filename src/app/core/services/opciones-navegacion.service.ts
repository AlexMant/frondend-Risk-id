import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  OpcionesnavegacionService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/Opcionesnavegacion');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/Opcionesnavegacion/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/Opcionesnavegacion',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/Opcionesnavegacion/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/Opcionesnavegacion/'+id);
  }

  getmenuUsuario(id:any): Observable<any> {

    return this.httpGet('/Opcionesnavegacion/menuUsuario/'+id);
  }

}
