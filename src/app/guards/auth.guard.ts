import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { AuthenticatedResponse } from '../core/interfaces/authenticated-response.model';
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
    // return true;

    console.log('this.router.url 2', this.getResolvedUrl(route));
    const token = localStorage.getItem("jwt")!;
    console.log("token", token);

    if (!token || token === 'undefined' || token === null) {
      
        
     
      this.router.navigateByUrl("/auth/login");
      return false;
    }

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      //  console.log("this.jwtHelper.decodeToken(token)",this.jwtHelper.decodeToken(token))
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigateByUrl("/auth/login");
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = this.localStore.getData("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = { accessToken: token, refreshToken: refreshToken };
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {

      this.authService.refreshToken(credentials)
        .subscribe({
          next: (res: AuthenticatedResponse) => resolve(res),
          error: (_) => { console.log("error refresh"), isRefreshSuccess = false; reject; this.router.navigateByUrl("/auth/login"); }
        });
    });



    // localStorage.setItem("jwt", refreshRes.token);
    this.localStore.saveData('jwt', refreshRes.refreshToken);
    // localStorage.setItem("refreshToken", refreshRes.refreshToken);
    this.localStore.saveData('refreshToken', refreshRes.refreshToken);

    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
}
