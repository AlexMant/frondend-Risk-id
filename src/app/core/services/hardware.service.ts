import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  HardwareService extends BaseService  {

  getall(): Observable<any> {
    return this.httpGet('api/Hardware');
  }
  getallhardware(body:any): Observable<any> {
   
    return this.httpPost('api/Hardware/consultagestion',body);
  }
  getid(id:any): Observable<any> {
    return this.httpGet('api/Hardware/'+id);
  }
  post(body:any): Observable<any> {
    return this.httpPost('api/Hardware',body);
  }
  put(id:any, body:any): Observable<any> {
    return this.httpPut('api/Hardware/'+id,body);
  }
  delete(id:any): Observable<any> {
    return this.httpDelete('api/Hardware/'+id);
  }
  cambiaestado(id:any, body:any): Observable<any> {
    return this.httpPut('api/Hardware/cambiaestado/'+id,body);
  }
   
  informeinventario(body:any): Observable<any> {
    console.log("body",body)
    return this.httpPost('api/Hardware/informeinventario',body);
  }
  gethardwaredisponible(body:any): Observable<any> {
    console.log("body",body)
    return this.httpPost('api/Hardware/gethardwaredisponible',body);
  }

  gethardwaredisponiblestop(idempresa:any,iditems:any): Observable<any> {
    return this.httpGet('api/Hardware/hardwareDisponiblesTop/'+idempresa+'/'+iditems);
  }
  gethardwaredisponiblessolicitud(idempresa:any): Observable<any> {
    return this.httpGet('api/Hardware/hardwareDisponiblessolicitud/'+idempresa);
  }
}
