import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TiposFlashService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/tipos-flash');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/tipos-flash/'+id);
  }
       getbyparams(params: any): Observable<any> {
    return this.httpGet('/tipos-flash' + params);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/tipos-flash',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/tipos-flash/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/tiposflash/'+id);
  }

   

}
