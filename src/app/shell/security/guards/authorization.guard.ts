import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AppAreaLocatorService } from '../../app-areas/services';
import { SecurityUserSingletonService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private securityUserSingleton: SecurityUserSingletonService,
    private areaLocator: AppAreaLocatorService) {
  }

  public canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.securityUserSingleton.instance.isAuthenticated;

    if (isAuthenticated) {
      return true;
    }

    const area = this.areaLocator.locateByUrl(state.url);
    if (!area.needsAuthentication) {
      return true;
    }

    this.router.navigate(['/home/welcome'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
