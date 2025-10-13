import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { LocalService } from '../core/services/local-services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  urlEndNav: any = '';
  constructor(private router: Router, private jwtHelper: JwtHelperService, private http: HttpClient,
    private authService: AuthService,
    private localStore: LocalService
  ) {


  }
  componentDestroyed$: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigateByUrl("/auth/login");
      return false;
    }
    return true;
  }

  private async tryRefreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken = this.localStore.getData("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }
    const credentials = { accessToken: token, refreshToken };
    try {
      const refreshRes = await this.authService.refreshToken(credentials).toPromise();
      this.localStore.saveData('jwt', refreshRes.token);
      this.localStore.saveData('refreshToken', refreshRes.refreshToken);
      return true;
    } catch (error) {
      console.log("error refresh", error);
      this.router.navigateByUrl("/auth/login");
      return false;
    }
  }
}
