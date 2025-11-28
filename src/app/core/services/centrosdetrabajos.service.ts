import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  CentrosdetrabajosService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('/centrostrabajo');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('/centrostrabajo/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('/centrostrabajo',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/centrostrabajo/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('/centrostrabajo/'+id);
  }

    tree(id:any): Observable<any> {
    return this.httpGet('/centrostrabajo/'+id+'/tree');
  }
      usuarios(id:any): Observable<any> {
    return this.httpGet('/centrostrabajo/'+id+'/usuarios');
  }

        restore(id:any): Observable<any> {
    return this.httpGet('/centrostrabajo/'+id+'/restore');
  }

  
    /**
   * cambiar estado al centro de trabajo.
   * @param id ID del centro de trabajo a activar.
   */
  toggleActive(id: any): Observable<any> {
    return this.httpGet('/centrosdetrabajo/' + id+ '/toggle-active');
  }

    getallbyempresa(idempresa:any): Observable<any> {
    return this.httpGet('/centrostrabajo?empresaId=' + idempresa);
  }
}
