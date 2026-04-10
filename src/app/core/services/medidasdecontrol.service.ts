import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MedidasdecontrolService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/medidas-control');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/medidas-control/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/medidas-control',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/medidas-control/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/medidas-control/'+id);
  }

    tree(id:any): Observable<any> {
    return this.httpGet('/medidas-control/'+id+'/tree');
  }
      usuarios(id:any): Observable<any> {
    return this.httpGet('/medidas-control/'+id+'/usuarios');
  }

        restore(id:any): Observable<any> {
    return this.httpGet('/medidas-control/'+id+'/restore');
  }

  
    /**
   * cambiar estado al centro de trabajo.
   * @param id ID del centro de trabajo a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/medidas-control/' + id+ '/toggle-active');
  }
}
