import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AppAreaLocatorService } from '../../app-areas/services';
import { SecurityUserSingletonService } from '../../security/services';
import { AppNavigationEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationEntryFactoryService {

  private _cache: Array<AppNavigationEntry> | null = null;

  public constructor(
    private userSingleton: SecurityUserSingletonService,
    private areaLocator: AppAreaLocatorService) { }

  public createNavigationEntries(): AppNavigationEntry[] {
    this.assureInitialized();
    return this._cache!;
  }

  private assureInitialized(): void {
    const areas = this.areaLocator.locateAllAreas();

    const userAuthenticationChanged$ = this.userSingleton
      .userChanged$.pipe(map(user => user.isAuthenticated));

    const entries = areas.map(area => new AppNavigationEntry(
      area.displayText,
      area.baseUrl,
      area.needsAuthentication,
      this.userSingleton.instance.isAuthenticated,
      userAuthenticationChanged$));

    this._cache = entries;
  }

}
