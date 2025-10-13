
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class  EnvioMailService extends BaseService  {

  
  mailform(body:any): Observable<any> {
    
    return this.httpPost('api/Enviomail/mailform',body);
  }
  mailformlote(body:any): Observable<any> {
  
   return this.httpPost('api/Enviomail/mailformlote',body);
 }
 

}
