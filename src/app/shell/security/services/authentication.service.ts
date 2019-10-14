import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { IAppState } from '../../app-state';
import { LoginRequest, LoginResult } from '../models';
import { SetSecurityUserAction } from '../state/actions';

import { SecurityHttpService } from './security-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private store: Store<IAppState>,
    private httpService: SecurityHttpService,
    private translator: TranslateService) { }

  public async logInAsync(loginRequest: LoginRequest): Promise<void> {
    const loginResult = await this.httpService.postAsync<LoginResult>('login', loginRequest);

    if (loginResult.loginSuccess) {
      const nameClaim = loginResult.claims.find(f => f.type.endsWith('name'));
      const action = new SetSecurityUserAction(true, nameClaim!.value, loginResult.token);
      this.store.dispatch(action);
    } else {
      this.setUnauthenticated();
    }
  }

  public initialize(): void {
    this.setUnauthenticated();
  }

  public logOut(): void {
    this.setUnauthenticated();
  }

  private setUnauthenticated(): void {
    const guestDescription = this.translator.instant('shell.security.services.guest');
    this.store.dispatch(new SetSecurityUserAction(false, guestDescription, ''));
  }
}
