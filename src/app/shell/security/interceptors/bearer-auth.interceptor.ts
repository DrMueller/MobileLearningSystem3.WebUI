import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ISecurityState } from '../../app-state';

@Injectable()
export class BearerAuthInterceptor implements HttpInterceptor {
  private securityState: ISecurityState;

  public constructor(store: Store<ISecurityState>) {
    store.subscribe(sr => this.securityState = sr);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.securityState.userIsLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.securityState.userToken}`
        }
      });
    }

    return next.handle(request);
  }
}
