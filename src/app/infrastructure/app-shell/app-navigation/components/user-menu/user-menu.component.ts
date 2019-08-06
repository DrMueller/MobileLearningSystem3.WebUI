import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { SecurityUser } from '../../../security/models';
import { AuthenticationService } from '../../../security/services/authentication.service';
import { SecurityUserSingletonService } from '../../../security/services/security-user-singleton.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  public constructor(
    private authService: AuthenticationService,
    private securityUserSingleton: SecurityUserSingletonService,
    private router: Router,
    private translator: TranslateService) {
  }

  public get userName(): string {
    return this.securityUserSingleton.instance.userName;
  }

  public get currentLanguage(): string {
    return this.translator.currentLang;
  }

  public get isUserAuthenticated(): boolean {
    return this.securityUserSingleton.instance.isAuthenticated;
  }

  public logIn(): void {
    this.router.navigate(['login']);
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home/welcome']);
  }

  public get securityUser$(): Observable<SecurityUser> {
    return this.securityUserSingleton.userChanged$;
  }

  public switchLanguageToEnglish(): void {
    this.translator.use('en');
  }

  public switchLanguageToGerman(): void {
    this.translator.use('de');
  }

  public get userText(): string {
    return this.securityUserSingleton.instance.userName;
  }
}
