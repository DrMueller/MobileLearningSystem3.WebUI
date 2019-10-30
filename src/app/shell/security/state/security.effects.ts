import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { SecurityUser } from '../models';
import { AuthenticationService } from '../services';

import { SecurityActionTypes } from '.';
import { LogInAction, PersistUserAction } from './actions';
import { UserChangedAction } from './actions/user-changed.action';

@Injectable({
  providedIn: 'root'
})
export class SecurityEffects {
  constructor(
    private authService: AuthenticationService,
    private actions$: Actions,
    private router: Router) { }

  @Effect()
  public logIn$(): Observable<PersistUserAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.LogIn),
      map((action: LogInAction) => action.request),
      mergeMap(loginRequest =>
        this.authService.logIn$(loginRequest).pipe(
          tap(() => this.router.navigate(['home'])),
          map(user => new PersistUserAction(user))
        )
      ));
  }

  @Effect()
  public logOut$(): Observable<PersistUserAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.LogOut),
      mergeMap(() => this.authService.createGuestUser$().pipe(
        map(guestUser => new PersistUserAction(guestUser))
      ))
    );
  }

  @Effect()
  public persistUser$(): Observable<UserChangedAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.PersistUser),
      map((action: PersistUserAction) => action.user),
      map((user: SecurityUser) => {
        this.authService.saveUser(user);
        return new UserChangedAction(user);
      })
    );
  }

  @Effect()
  public initializeUser$(): Observable<UserChangedAction> {
    return this.actions$.pipe(
      ofType(SecurityActionTypes.InitializeUser),
      mergeMap(() => this.authService.initializeUser$().pipe(
        map(user => new UserChangedAction(user))
      )));
  }
}
