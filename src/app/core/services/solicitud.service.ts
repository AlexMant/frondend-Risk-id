import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  SolicitudService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Solicitud');
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Solicitud/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Solicitud',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Solicitud/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Solicitud/'+id);
  }

  insertasolicitud(body:any): Observable<any> {
    return this.httpPost('api/Solicitud/insertasolicitud',body);
  }
  getconsultasolicitud(body:any): Observable<any> {
    return this.httpPost('api/Solicitud/getconsultasolicitud',body);
  }

 

  getcabecerasolicitud(id:any): Observable<any> {
    return this.httpGet('api/Solicitud/getcabecerasolicitud/'+id);
  }
  getdetallesolicitud(id:any): Observable<any> {
    return this.httpGet('api/Solicitud/getdetallesolicitud/'+id);
  }

  updateestadosolicitud(body:any): Observable<any> {
    console.log(body);
    return this.httpPost('api/Solicitud/actualizaestado',body);
  }

  generacotizabysolicitud(body:any): Observable<any> {
    return this.httpPost('api/Solicitud/generacotizabysolicitud',body);
  }

  //dashboard
  getdasboardusuario(id:any): Observable<any> {
    return this.httpGet('api/Solicitud/getdasboardusuario/'+id);
  }

   


  insertacotizacion(body:any): Observable<any> {
    return this.httpPost('api/Solicitud/insertacotizacion',body);
  }


}
