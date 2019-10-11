import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppAreaLocatorService } from '../../app-areas/services';
import { getUserIsLoggedIn, IAppState } from '../../app-state';
import { AppNavigationEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationEntryFactoryService {
  private _cache: Array<AppNavigationEntry> | null = null;

  public constructor(
    private areaLocator: AppAreaLocatorService,
    private store: Store<IAppState>) { }

  public createNavigationEntries(): AppNavigationEntry[] {
    this.assureInitialized();
    return this._cache!;
  }

  private assureInitialized(): void {
    const areas = this.areaLocator.locateAllAreas();

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
