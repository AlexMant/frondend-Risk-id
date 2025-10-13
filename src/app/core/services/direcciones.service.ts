import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  DireccionesService extends BaseService  {


  getall(): Observable<any> {
    return this.httpGet('api/Direcciones');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Direcciones/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Direcciones',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Direcciones/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Direcciones/'+id);
  }

  insdireccionusuario(body:any): Observable<any> {
    return this.httpPost('api/Direcciones/insdirecionusuario',body);
  }

  deletedireccionusuario(id:any): Observable<any> {
    return this.httpDelete('api/Direcciones/deletedirecionusuario/'+id);
  }

  deletedireccionempresa(id:any): Observable<any> {
    return this.httpDelete('api/Direcciones/deletedirecionempresa/'+id);
  }

   
  getallbyusuario(id:any): Observable<any> {
     
    return this.httpGet('api/Direcciones/getallbyusuario/'+id);
  }

  activar(id:any): Observable<any> {
    return this.httpDelete('api/Direcciones/activardireccion/'+id);
  }
  desactivar(id:any): Observable<any> {
    return this.httpDelete('api/Direcciones/desactivardireccion/'+id);
  }
   
  getallbyempresa(id:any): Observable<any> {
     
    return this.httpGet('api/Direcciones/getallbyempresa/'+id);
  }
   

}
