import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getUserIsAuthenticated, getUserName } from 'src/app/shell/security/state';
import { LogOutAction } from 'src/app/shell/security/state/actions';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public userName: string;

  public constructor(
    private router: Router,
    private translator: TranslateService,
    private store: Store<any>) {
  }

  public get isUserAuthenticated$(): Observable<boolean> {
    return this.store.pipe(select(getUserIsAuthenticated));
  }

  public get currentLanguage(): string {
    return this.translator.currentLang;
  }

  public logIn(): void {
    this.router.navigate(['login']);
  }

  public logOut(): void {
    this.store.dispatch(new LogOutAction());
    this.router.navigate(['/home/welcome']);
  }

  public ngOnInit(): void {
    this.store.pipe(select(getUserName)).subscribe(name => {
      this.userName = name;
    });
  }

  public switchLanguageToEnglish(): void {
    this.translator.use('en');
  }

  public switchLanguageToGerman(): void {
    this.translator.use('de');
  }
}
