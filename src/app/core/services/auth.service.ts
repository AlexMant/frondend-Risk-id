import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map, Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {


  login(body: any): Observable<any> {
    return this.httpPost('API-DEV/web/login', body);
  }

  refreshToken(body: any): Observable<any> {
    return this.httpPost('API-DEV/web/refresh-access-token', body);
  }

  forgot(body: any): Observable<any> {
    console.log("forgot",body);
    return this.httpPost('/API-DEV/web/password/reset/temporary', body);
  }

 
  // valmail(body: any): Observable<any> {
  //   return this.httpGet('api/auth/valmail/'+body);
  // }

  // get(): Observable<any> {
  //   console.log("get");
  //   return this.httpGet('api/auth/autorizacion/');
  // }
 
 
  
 
}
