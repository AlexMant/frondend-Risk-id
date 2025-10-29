import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map, Observable } from 'rxjs';
import { BaseService } from './base.service';

/**
 * Servicio de autenticación y gestión de sesión de usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param body Credenciales de usuario.
   */
  login(body: any): Observable<any> {
    return this.httpPost('/login', body);
  }

  /**
   * Refresca el token de acceso usando el refresh token.
   * @param body Datos con el refresh token.
   */
  refreshToken(body: any): Observable<any> {
    return this.httpPost('/refresh-access-token', body);
  }

  /**
   * Solicita el reseteo de contraseña temporal.
   * @param body Datos del usuario.
   */
  forgot(body: any): Observable<any> {
    console.log("forgot",body);
    return this.httpPost('/password/reset/temporary', body);
  }
}
