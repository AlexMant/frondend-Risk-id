import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService  extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/Usuarios');
  }
  getallUsuario(body:any): Observable<any> {

    return this.httpPost('/Usuarios/consultagestion',body);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/Usuarios/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/Usuarios',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/Usuarios/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/Usuarios/'+id);
  }

  activar(id:any): Observable<any> {
    return this.httpDelete('/Usuarios/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('/Usuarios/desactivar/'+id);
  }
  getbymail(id:any): Observable<any> {
    return this.httpGet('/Usuarios/getbymail/'+id);
  }
 

   updateclave(body:any): Observable<any> {
    return this.httpPost('/password/change',body);
   }

   valmailusuario(body: any): Observable<any> {
    return this.httpGet('/Usuarios/validamail/'+body);
  }

  getbyempresa(id:any): Observable<any> {
    return this.httpGet('/Usuarios/getbyempresa/'+id);
  }
 

}
