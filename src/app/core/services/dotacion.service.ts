import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  DotacionService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/dotacion');
  }
     getbyparams(params: any): Observable<any> {
    return this.httpGet('/dotacion' + params);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/dotacion/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/dotacion',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/dotacion/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/dotacion/'+id);
  } 

   

}
