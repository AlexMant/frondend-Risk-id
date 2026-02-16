import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  FlashService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/Flash');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/Flash/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/Flash',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/Flash/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/Flash/'+id);
  }

   

}
