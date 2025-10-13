import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  EmpresaService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Empresa');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Empresa/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Empresa',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Empresa/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Empresa/'+id);
  }
  valmailempresa(body: any): Observable<any> {
    return this.httpGet('api/Empresa/valmailempresa/'+body);
  }
  activar(id:any): Observable<any> {
    return this.httpDelete('api/Empresa/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('api/Empresa/desactivar/'+id);
  }

}
