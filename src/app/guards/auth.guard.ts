import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../core/services/auth.service';
import { LocalService } from '../core/services/local-services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private localStore: LocalService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const token = localStorage.getItem('jwt');
    console.log("canActivate", token);
    if (!token || token === 'undefined') {
      this.router.navigateByUrl('/auth/login');
      return Promise.resolve(false);
    }
    if (token && !this.jwtHelper.isTokenExpired(token)) {

      return Promise.resolve(true);
    }
    console.log("Token válido");
    const refreshToken = this.localStore.getData('refreshToken');
    return this.authService.refreshToken({ refreshToken }).toPromise().then((isRefreshSuccess: any) => {
      if (!isRefreshSuccess) {
        this.router.navigateByUrl('/auth/login');
        return false;
      }
    return true;
    });
  }
}
