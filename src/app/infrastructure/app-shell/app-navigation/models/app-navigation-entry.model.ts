import { BehaviorSubject, Observable } from 'rxjs';

export class AppNavigationEntry {
  private _isActive: BehaviorSubject<boolean>;

  constructor(
    public readonly displayText: string,
    public readonly baseUrl: string,
    needsAuthentication: boolean,
    userAuthenticated: boolean,
    userAuthenticatedChanged$: Observable<boolean>) {

    this._isActive = new BehaviorSubject(!needsAuthentication || userAuthenticated);
    userAuthenticatedChanged$.subscribe(isAuth => {
      this._isActive.next(!needsAuthentication || isAuth);
    });
  }

  public get isActive$(): Observable<boolean> {
    return this._isActive;
  }
}
