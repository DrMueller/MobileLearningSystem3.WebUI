import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SecurityUserSingletonService } from '../services';

@Injectable()
export class BearerAuthInterceptor implements HttpInterceptor {
    public constructor(private securityUserSingleton: SecurityUserSingletonService) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.securityUserSingleton.instance.isAuthenticated) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.securityUserSingleton.instance.token}`
                }
            });
        }

        return next.handle(request);
    }
}
