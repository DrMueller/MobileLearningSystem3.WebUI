import { Injectable } from '@angular/core';
import { AppSettingsSingletonService } from 'src/app/infrastructure/core-services/app-settings/services';
import { AppConnectivityService } from 'src/app/infrastructure/shared-features/pwa/app-connectivity/services';
import { InstallPwaPromptService } from 'src/app/infrastructure/shared-features/pwa/pwa-installation/services';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private appSettingsSingleton: AppSettingsSingletonService,
    private appConnectivity: AppConnectivityService,
    private installPwaPrompt: InstallPwaPromptService
  ) { }

  public async initializeAppAsync(): Promise<void> {
    this.appConnectivity.initialize();
    this.installPwaPrompt.registerUpdateAvaliableCallback();
    await this.appSettingsSingleton.initializeAsync();
  }
}
