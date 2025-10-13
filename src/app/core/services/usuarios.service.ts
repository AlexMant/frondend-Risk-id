import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService  extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Usuarios');
  }
  getallUsuario(body:any): Observable<any> {
   
    return this.httpPost('api/Usuarios/consultagestion',body);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Usuarios/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Usuarios',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Usuarios/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Usuarios/'+id);
  }

  activar(id:any): Observable<any> {
    return this.httpDelete('api/Usuarios/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('api/Usuarios/desactivar/'+id);
  }
  getbymail(id:any): Observable<any> {
    return this.httpGet('api/Usuarios/getbymail/'+id);
  }
 

   updateclave(body:any): Observable<any> {
     return this.httpPost('API-DEV/web/password/change', body);
   }

   valmailusuario(body: any): Observable<any> {
    return this.httpGet('api/Usuarios/validamail/'+body);
  }

  getbyempresa(id:any): Observable<any> {
    return this.httpGet('api/Usuarios/getbyempresa/'+id);
  }
 

}
