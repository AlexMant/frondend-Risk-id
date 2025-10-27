import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  EmpresaService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('API-DEV/web/empresas');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('API-DEV/web/empresas/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('API-DEV/web/empresas',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('API-DEV/web/empresas/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('API-DEV/web/empresas/'+id);
  }
  getprocesosbyempresa(id:any): Observable<any> {
    return this.httpGet('API-DEV/web/empresas/'+id+'/procesos');
  }

  valmailempresa(body: any): Observable<any> {
    return this.httpGet('API-DEV/web/empresas/valmailempresa/'+body);
  }
  activar(id:any): Observable<any> {
    return this.httpDelete('API-DEV/web/empresas/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('API-DEV/web/empresas/desactivar/'+id);
  }

}
