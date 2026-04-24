import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class actividdesdecontrolService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/actividades-control');
  }
   getparams(params:any): Observable<any> {
    return this.httpGet('/actividades-control?'+params);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/actividades-control/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/actividades-control',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/actividades-control/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/actividades-control/'+id);
  }
 

        restore(id:any): Observable<any> {
    return this.httpGet('/actividades-control/'+id+'/restore');
  }

  
    /**
   * cambiar estado al centro de trabajo.
   * @param id ID del centro de trabajo a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/actividades-control/' + id+ '/toggle-active');
  }
}
