import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  BodegasempresaService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Bodegasempresa');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Bodegasempresa/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Bodegasempresa',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Bodegasempresa/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Bodegasempresa/'+id);
  }
  
  getbodegasbyempresa(id:any): Observable<any> {
    return this.httpGet('api/Bodegasempresa/empresa/'+id);
  }
   

}