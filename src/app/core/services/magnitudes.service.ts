import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MagnitudesService extends BaseService   {

getall(): Observable<any> {
    return this.httpGet('/magnitudes');
  }
  getallbyempresa(empresaId:any): Observable<any> {
    return this.httpGet('/magnitudes?empresaId='+empresaId);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/magnitudes/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/magnitudes',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/magnitudes/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/magnitudes/'+id);
  }
 
}