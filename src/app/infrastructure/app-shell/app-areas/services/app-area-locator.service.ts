import { Inject, Injectable } from '@angular/core';

import { AppAreaProviderToken } from '../constants';
import { IAppAreaProviderService } from '../interfaces';
import { AppArea } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppAreaLocatorService {
  public constructor(@Inject(AppAreaProviderToken) private areaProviders: IAppAreaProviderService[]) { }

  public locateAreas(): AppArea[] {
    const areas = this.areaProviders.map(ap => ap.provideArea());
    return areas;
  }
}
