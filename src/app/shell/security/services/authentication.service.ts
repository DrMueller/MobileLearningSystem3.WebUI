import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StorageService } from 'src/app/core/storage/services';

import { LoginResult, SecurityUser } from '../models';
import { SecurityActionTypes } from '../state';
import { LogInAction, PersistUserAction } from '../state/actions';
import { UserChangedAction } from '../state/actions/user-changed.action';

import { SecurityHttpService } from './security-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _userKey = 'User';

  constructor(
    private httpService: SecurityHttpService,
    private translator: TranslateService,
    private storage: StorageService,
    private actions$: Actions) { }

  @Effect()
  public logIn$(): Observable<PersistUserAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.LogIn),
      map((action: LogInAction) => action.request),
      mergeMap(loginRequest =>
        this.httpService.post$<LoginResult>('login', loginRequest).pipe(
          map(loginResult => {
            const nameClaim = loginResult.claims.find(f => f.type.endsWith('name'));
            const user = new SecurityUser(nameClaim!.value, true, loginResult.token);
            return new PersistUserAction(user);
          })
        ))
    );
  }

  @Effect()
  public logOut$(): Observable<PersistUserAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.LogOut),
      map(() => {
        const guestDescription = this.translator.instant('shell.security.services.guest');
        const guestUser = new SecurityUser(guestDescription, false, '');
        return new PersistUserAction(guestUser);
      })
    );
  }

  @Effect()
  public persistUser$(): Observable<UserChangedAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.PersistUser),
      map((action: PersistUserAction) => action.user),
      map((user: SecurityUser) => {
        this.storage.save(this._userKey, user);
        return new UserChangedAction(user);
      })
    );
  }

  @Effect()
  public initializeUser$(): Observable<UserChangedAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.InitializeUser),
      map(() => {
        let user = this.storage.load<SecurityUser>(this._userKey);
        if (!user) {
          const guestDescription = this.translator.instant('shell.security.services.guest');
          user = new SecurityUser(guestDescription, false, '');
        }

        this.storage.save(this._userKey, user);
        return new UserChangedAction(user);
      }));
  }
}

