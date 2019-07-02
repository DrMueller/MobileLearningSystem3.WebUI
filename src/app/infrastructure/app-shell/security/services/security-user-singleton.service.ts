import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/infrastructure/core-services/session-storage/services';

import { SecurityUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SecurityUserSingletonService {
  private _userChanged$: BehaviorSubject<SecurityUser>;

  private readonly Key = 'securityUser';

  constructor(private sessionStorage: SessionStorageService) {
    this._userChanged$ = new BehaviorSubject<SecurityUser>(this.instance);
  }

  public get userChanged$(): Observable<SecurityUser> {
    return this._userChanged$;
  }
  public get instance(): SecurityUser {
    const user = this.sessionStorage.load<SecurityUser>(this.Key);
    if (!user) {
      return SecurityUser.createUnauthenticated();
    }

    return user;
  }

  public initialize(securityUser: SecurityUser): void {
    this.sessionStorage.save(this.Key, securityUser);
    this._userChanged$.next(securityUser);
  }
}
