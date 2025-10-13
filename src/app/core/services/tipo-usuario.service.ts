import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  TipousuarioService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Tipousuario');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Tipousuario/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Tipousuario',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Tipousuario/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Tipousuario/'+id);
  }

   

}
