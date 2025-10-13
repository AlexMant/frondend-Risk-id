import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map, Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  login(body: any): Observable<any> {
    return this.httpPost('api/auth/login', body);
  }

  refreshToken(body: any): Observable<any> {
    return this.httpPost('api/token/refresh', body);
  }

  forgot(body: any): Observable<any> {
    console.log("forgot",body);
    return this.httpPost('api/auth/forgot', body);
  }

  registro(body: any): Observable<any> {
    return this.httpPost('api/auth/registro', body);
  }

  valmail(body: any): Observable<any> {
    return this.httpGet('api/auth/valmail/'+body);
  }

  get(): Observable<any> {
    console.log("get");
    return this.httpGet('api/auth/autorizacion/');
  }
 

  logInWithGoogle(credential: string): Observable<any> {
      
    return this.logWithGoogle('api/auth/loginWithGoogle',credential);
  }

  
 
}
