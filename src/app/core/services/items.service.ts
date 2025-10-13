import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  ItemsService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Items');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Items/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Items',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Items/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Items/'+id);
  }

   
  activar(id:any): Observable<any> {
    return this.httpDelete('api/Items/activar/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('api/Items/desactivar/'+id);
  }

  getitemsdisponiblestop(id:any): Observable<any> {
    return this.httpGet('api/Items/itemsdisponiblestop/'+id);
  }

  
  getinventariodisponible(id:any): Observable<any> {
    return this.httpGet('api/Items/inventariodisponible/'+id);
  }
}
