import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SecurityUser } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';
import { SecurityUserSingletonService } from '../../services/security-user-singleton.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  public constructor(
    private authService: AuthenticationService,
    private securityUserSingleton: SecurityUserSingletonService,
    private router: Router) {
  }

  public get userText(): string {
    return this.securityUserSingleton.instance.userName;
  }

  public get isUserAuthenticated(): boolean {
    return this.securityUserSingleton.instance.isAuthenticated;
  }

  public get securityUser$(): Observable<SecurityUser> {
    return this.securityUserSingleton.userChanged$;
  }

  public logIn(): void {
    this.router.navigate(['login']);
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home/welcome']);
  }
}
