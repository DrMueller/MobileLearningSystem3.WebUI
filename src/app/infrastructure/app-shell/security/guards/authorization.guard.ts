import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SecurityUserSingletonService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private securityUserSingleton: SecurityUserSingletonService) {
  }

  public canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.securityUserSingleton.instance.isAuthenticated;
    const notAllowedArea = state.url.startsWith('/facts');

    if (!isAuthenticated && notAllowedArea) {
      this.router.navigate(['/home/welcome'], { queryParams: { returnUrl: state.url } });
    }

    return true;
  }
}
