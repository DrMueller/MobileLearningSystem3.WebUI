import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppAreaFactoryService } from '../../app-areas/services';
import { getUserIsLoggedIn, IAppState } from '../../app-state';
import { AppNavigationEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationEntryFactoryService {
  private _cache: Array<AppNavigationEntry> | null = null;

  public constructor(
    private areaFactory: AppAreaFactoryService,
    private store: Store<IAppState>) { }

  public createNavigationEntries(): AppNavigationEntry[] {
    this.assureInitialized();
    return this._cache!;
  }

  private assureInitialized(): void {
    const areas = this.areaFactory.createAllAreas();

    const userAuthenticationChanged$ = this.store.pipe(select(getUserIsLoggedIn));

    const entries = areas.map(area => new AppNavigationEntry(
      area.displayText,
      area.baseUrl,
      area.needsAuthentication,
      false,
      userAuthenticationChanged$));

    this._cache = entries;
  }
}
