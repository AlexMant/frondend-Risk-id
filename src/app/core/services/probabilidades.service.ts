import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class ProbabilidadesService extends BaseService {

 getall(): Observable<any> {
     return this.httpGet('/probabilidades');
   }
   getallbyempresa(empresaId:any): Observable<any> {
     return this.httpGet('/probabilidades?empresaId='+empresaId);
   }
   getid(id:any): Observable<any> {
     return this.httpGet('/probabilidades/'+id);
   }
   post(body:any): Observable<any> {
     return this.httpPost('/probabilidades',body);
   }
   put(id:any, body:any): Observable<any> {
     return this.httpPut('/probabilidades/'+id,body);
   }
   delete(id:any): Observable<any> {
     return this.httpDelete('/probabilidades/'+id);
   }
}
