import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from 'src/app/core/storage/services';

import { SecurityUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SecurityUserSingletonService {

  public get instance(): SecurityUser {
    const user = this.sessionStorage.load<SecurityUser>(this.Key);
    if (!user) {
      return this._unauthenticatedUser;
    }

    return user;
  }

  public get userChanged$(): Observable<SecurityUser> {
    return this._userChanged$;
  }

  private _unauthenticatedUser: SecurityUser;
  private _userChanged$: BehaviorSubject<SecurityUser>;
  private readonly Key = 'securityUser';

  constructor(
    private sessionStorage: StorageService,
    private translator: TranslateService) {
    this._userChanged$ = new BehaviorSubject<SecurityUser>(this.instance);

    this.translator.onLangChange.subscribe(async () => {
      await this.createUnauthenticatedUserAsync();
      if (!this.instance.isAuthenticated) {
        this.saveAndPublish(this._unauthenticatedUser);
      }
    });
  }

  public async initializeAsync(): Promise<void> {
    this.createUnauthenticatedUserAsync();
  }

  public clearUser(): void {
    this.saveAndPublish(this._unauthenticatedUser);
  }

  public setUser(securityUser: SecurityUser): void {
    this.saveAndPublish(securityUser);
  }

  private async createUnauthenticatedUserAsync(): Promise<void> {
    const guestDescription = await this.translator.get('shell.security.services.guest').toPromise();
    this._unauthenticatedUser = new SecurityUser(guestDescription, false, '');
  }

  private saveAndPublish(securityUser: SecurityUser): void {
    this.sessionStorage.save(this.Key, securityUser);
    this._userChanged$.next(securityUser);
  }
}
