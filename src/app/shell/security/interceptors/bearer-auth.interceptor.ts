import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getUserToken, IAppState } from '../../app-state';
import { getUserIsLoggedIn } from '../state';

@Injectable()
export class BearerAuthInterceptor implements HttpInterceptor {
  private _userIsLoggedIn: boolean;
  private _userToken: string;

  public constructor(store: Store<IAppState>) {
    store.pipe(select(getUserIsLoggedIn)).subscribe(loggedIn => this._userIsLoggedIn = loggedIn);
    store.pipe(select(getUserToken)).subscribe(token => this._userToken = token);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._userIsLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._userToken}`
        }
      });
    }

    return next.handle(request);
  }
}
