import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// https://dev.to/imben1109/date-handling-in-angular-application-part-2-angular-http-client-and-ngx-datepicker-3fna
@Injectable()
export class JsonDateInterceptor implements HttpInterceptor {
  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(map((val: HttpEvent<any>) => {
      if (val instanceof HttpResponse) {
        const body = val.body;
        this.convert(body);
      }

      return val;
    }));
  }

  private checkIfIsIsoDateString(value: any): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    return this._isoDateFormat.test(value);
  }

  private convert(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }
    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.checkIfIsIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        this.convert(value);
      }
    }
  }
}
