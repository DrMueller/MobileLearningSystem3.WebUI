import { Injectable } from '@angular/core';
import { AppSettingsSingletonService } from 'src/app/infrastructure/core-services/app-settings/services';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private appSettingsSingleton: AppSettingsSingletonService
  ) { }

  public async initializeAppAsync(): Promise<void> {
    await this.appSettingsSingleton.initializeAsync();
  }
}
