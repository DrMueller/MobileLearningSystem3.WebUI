import { Injectable } from '@angular/core';

import { AppNavigationEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationEntryFactoryService {

  private _cache: Array<AppNavigationEntry> | null = null;

  public createNavigationEntries(): AppNavigationEntry[] {
    this.assureInitialized();
    return this._cache!;
  }

  private assureInitialized(): void {
    const entries = new Array<AppNavigationEntry>();

    entries.push(new AppNavigationEntry('Home', '/home'));
    entries.push(new AppNavigationEntry('Facts', '/facts'));
    entries.push(new AppNavigationEntry('Learning sessions', '/learningsessions'));
    this._cache = entries;
  }
}
