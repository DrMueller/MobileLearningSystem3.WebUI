import { Inject, Injectable } from '@angular/core';

import { AppAreaProviderToken } from '../constants';
import { IAppAreaProviderService } from '../interfaces';
import { AppArea } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppAreaLocatorService {
  private _areas: AppArea[];

  public constructor(@Inject(AppAreaProviderToken) areaProviders: IAppAreaProviderService[]) {
    this._areas = areaProviders.map(ap => ap.provideArea()).sort((a, b) => a.sortIndex < b.sortIndex ? -1 : 1);
  }

  public locateAllAreas(): AppArea[] {
    return this._areas;
  }

  public locateByUrl(url: string): AppArea {
    const area = this._areas.find(a => url.startsWith(a.baseUrl))!;
    return area;
  }
}
