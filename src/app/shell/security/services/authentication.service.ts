import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/core/storage/services';

import { LoginRequest, LoginResult, SecurityUser } from '../models';

import { SecurityHttpService } from './security-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _userKey = 'User';

  public constructor(
    private httpService: SecurityHttpService,
    private translator: TranslateService,
    private storage: StorageService) { }

  public createGuestUser$(): Observable<SecurityUser> {
    return this.translator.get('shell.security.services.guest').pipe(
      map(guestDescription => {
        const guestUser = new SecurityUser();
        guestUser.isAuthenticated = false;
        guestUser.token = '';
        guestUser.userName = guestDescription;
        return guestUser;
      })
    );
  }

  public initializeUser$(): Observable<SecurityUser> {
    const user = this.storage.load<SecurityUser>(this._userKey);
    if (!user) {
      return this.createGuestUser$().pipe(tap(guestUser => this.saveUser(guestUser)));
    } else {
      return of(user);
    }
  }

  public logIn$(loginRequest: LoginRequest): Observable<SecurityUser> {
    return this.httpService.post<LoginResult>('login', loginRequest).pipe(
      mergeMap(loginResult => {
        if (loginResult.loginSuccess) {
          const nameClaim = loginResult.claims.find(f => f.type.endsWith('name'));
          const user = new SecurityUser();
          user.userName = nameClaim!.value;
          user.isAuthenticated = true;
          user.token = loginResult.token;
          return of(user);
        } else {
          return this.createGuestUser$();
        }
      }));
  }

  public saveUser(user: SecurityUser): void {
    this.storage.save(this._userKey, user);
  }
}
