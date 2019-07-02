import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginRequest, SecurityUser } from '../../models';
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
    private securityUserSingleton: SecurityUserSingletonService
  ) {
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

  public async logInAsync(): Promise<void> {
    const loginRequest = new LoginRequest();
    loginRequest.password = 'test';
    loginRequest.userName = 'Matthias';

    await this.authService.logInAsync(loginRequest);
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
