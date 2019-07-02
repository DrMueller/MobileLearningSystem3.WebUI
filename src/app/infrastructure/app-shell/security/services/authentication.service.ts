import { Injectable } from '@angular/core';

import { LoginRequest, LoginResult, SecurityUser } from '../models';

import { SecurityHttpService } from './security-http.service';
import { SecurityUserSingletonService } from './security-user-singleton.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpService: SecurityHttpService,
    private securityUserSingleton: SecurityUserSingletonService) { }

  public async logInAsync(loginRequest: LoginRequest): Promise<void> {
    const loginResult = await this.httpService.postAsync<LoginResult>('login', loginRequest);

    if (loginResult.loginSuccess) {
      const nameClaim = loginResult.claims.find(f => f.type.endsWith('name'));
      this.securityUserSingleton.initialize(SecurityUser.createAuthenticated(nameClaim!.value, loginResult.token));
    } else {
      this.securityUserSingleton.initialize(SecurityUser.createUnauthenticated());
    }
  }

  public logOut(): void {
    this.securityUserSingleton.initialize(SecurityUser.createUnauthenticated());
  }
}
