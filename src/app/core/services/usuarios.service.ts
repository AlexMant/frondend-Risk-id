import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService  extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/usuarios');
  }
    getallbyparametros(param: any): Observable<any> {
      console.log("parametros usuarios", param)
    return this.httpGet('/usuarios' + param);
  }
  getallUsuario(body:any): Observable<any> {

    return this.httpPost('/usuarios/consultagestion',body);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/usuarios/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/usuarios',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/usuarios/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/usuarios/'+id);
  }

  activar(id:any): Observable<any> {
    return this.httpDelete('/usuarios/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('/usuarios/desactivar/'+id);
  }
  getbymail(id:any): Observable<any> {
    return this.httpGet('/usuarios/getbymail/'+id);
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
