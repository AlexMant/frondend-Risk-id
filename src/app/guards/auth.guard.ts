

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
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this.localStore.getData("jwt");
    const refreshToken = this.localStore.getData("refreshToken");
   console.log("accessToken",accessToken);
  //  console.log("refreshToken",refreshToken);
    
    // No tokens at all: must login
    if (!accessToken || !refreshToken) {
      this.router.navigateByUrl("/auth/login");
      return false;
    }

    // Access token still valid: proceed
    if (!this.jwtHelper.isTokenExpired(accessToken)) {
      return true;
    }

    // Try refreshing tokens
    const isRefreshSuccess = await this.tryRefreshingTokens(accessToken);
    if (!isRefreshSuccess) {
      this.router.navigateByUrl("/auth/login");
      return false;
    }

    // Tokens refreshed successfully
    return true;
  }


  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = this.localStore.getData("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = { accessToken: token, refreshToken: refreshToken };
    let isRefreshSuccess: boolean;
    
    /*
    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {

      this.authService.refreshToken(credentials)
        .subscribe({
          next: (res: AuthenticatedResponse) => resolve(res),
          error: (_) => { console.log("error refresh"), isRefreshSuccess = false; reject; this.router.navigateByUrl("/auth/login"); }
        });
    });
    */

    try {
      // Get the new accessToken. It does not get a new refreshToken.
      const refreshRes = await this.authService.refreshToken(credentials).toPromise();
       
      // localStorage.setItem("jwt", refreshRes.accessToken);
      this.localStore.saveData('jwt', refreshRes.accessToken);

      isRefreshSuccess = true;
    } catch(error) {
      console.log("error refresh")
      isRefreshSuccess = false;
      // this.router.navigateByUrl("/auth/login")  // canActivate() is doing this already, when tryRefreshingToken() is false.
    }
    return isRefreshSuccess;
  }
}
