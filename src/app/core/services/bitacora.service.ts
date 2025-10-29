import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio para gestión de bitácoras.
 */
@Injectable({
  providedIn: 'root'
})
export class BitacoraService extends BaseService  {
  /** Obtiene todas las bitácoras. */
  getall(): Observable<any> {
    return this.httpGet('/Bitacora');
  }
  /** Obtiene una bitácora por ID. */
  getid(id:any): Observable<any> {
    return this.httpGet('/Bitacora/'+id);
  }
  /** Crea una nueva bitácora. */
  post(body:any): Observable<any> {
    return this.httpPost('/Bitacora',body);
  }
  /** Actualiza una bitácora existente. */
  put(id:any, body:any): Observable<any> {
    return this.httpPut('/Bitacora/'+id,body);
  }
  /** Elimina una bitácora por ID. */
  delete(id:any): Observable<any> {
    return this.httpDelete('/Bitacora/'+id);
  }
}
