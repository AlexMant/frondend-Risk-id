import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  NotifcacionesappService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Notifcacionesapp');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Notifcacionesapp/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Notifcacionesapp',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Notifcacionesapp/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Notifcacionesapp/'+id);
  }

  notificacioneslist(): Observable<any> {
    return this.httpGet('api/Notifcacionesapp/notificacioneslist');
  }
  notificacionespush(): Observable<any> {
    return this.httpGet('api/Notifcacionesapp/notificacionespush');
  }
   
  getnotificacnt(): Observable<any> {
    return this.httpGet('api/Notifcacionesapp/getnotificacnt');
  }
}
