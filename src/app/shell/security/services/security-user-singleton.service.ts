// import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { BehaviorSubject } from 'rxjs';
// import { StorageService } from 'src/app/core/storage/services';

// import { SecurityUser } from '../models';

// @Injectable({
//   providedIn: 'root'
// })
// export class SecurityUserSingletonService {
//   public get instance(): SecurityUser {
//     const user = this.sessionStorage.load<SecurityUser>(this.Key);
//     if (!user) {
//       return this._unauthenticatedUser;
//     }

//     return user;
//   }

//   private _unauthenticatedUser: SecurityUser;
//   private _userChanged$: BehaviorSubject<SecurityUser>;
//   private readonly Key = 'securityUser';

//   constructor(
//     private sessionStorage: StorageService,
//     private translator: TranslateService) {

//     this.createUnauthenticated();
//     this._userChanged$ = new BehaviorSubject<SecurityUser>(this.instance);

//     this.translator.onLangChange.subscribe(async () => {
//       this.createUnauthenticated();
//       if (!this.instance.isAuthenticated) {
//         this.saveAndPublish(this._unauthenticatedUser);
//       }
//     });
//   }

//   public clearUser(): void {
//     this.saveAndPublish(this._unauthenticatedUser);
//   }

//   public initialize(): void {
//     this.createUnauthenticated();
//   }

//   public setUser(securityUser: SecurityUser): void {
//     this.saveAndPublish(securityUser);
//   }

//   private createUnauthenticated(): void {
//     const guestDescription = this.translator.instant('shell.security.services.guest');
//     this._unauthenticatedUser = new SecurityUser(guestDescription, false, '');
//   }

//   private saveAndPublish(securityUser: SecurityUser): void {
//     this.sessionStorage.save(this.Key, securityUser);
//     this._userChanged$.next(securityUser);
//   }
// }
