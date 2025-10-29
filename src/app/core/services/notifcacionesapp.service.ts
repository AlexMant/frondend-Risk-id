import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  NotifcacionesappService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/Notifcacionesapp');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/Notifcacionesapp/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/Notifcacionesapp',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/Notifcacionesapp/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/Notifcacionesapp/'+id);
  }

  notificacioneslist(): Observable<any> {
    return this.httpGet('/Notifcacionesapp/notificacioneslist');
  }
  notificacionespush(): Observable<any> {
    return this.httpGet('/Notifcacionesapp/notificacionespush');
  }
   
  getnotificacnt(): Observable<any> {
    return this.httpGet('/Notifcacionesapp/getnotificacnt');
  }
}
