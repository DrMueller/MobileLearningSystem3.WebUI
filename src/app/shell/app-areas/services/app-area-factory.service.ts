import { Injectable } from '@angular/core';

import { AppArea } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppAreaFactoryService {
  private _areas: AppArea[];


  public createAllAreas(): AppArea[] {
    this.assureAreasAreCreated();
    return this._areas;
  }

  public createAreaByUrl(url: string): AppArea {
    this.assureAreasAreCreated();
    const area = this._areas.find(a => url.startsWith(a.baseUrl))!;
    return area;
  }

  private assureAreasAreCreated(): void {
    if (!!this._areas) {
      return;
    }

    this._areas = [
      new AppArea('Home', '/home', false),
      new AppArea('Facts', '/facts', true),
      new AppArea('Learning Sessions', '/learningsessions', false),
      new AppArea('Tensorflow', '/tensorflow', false)
    ];
  }
}
