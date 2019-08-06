import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsSingletonService } from 'src/app/infrastructure/core-services/app-settings/services';
import { AppConnectivityService } from 'src/app/infrastructure/shared-features/pwa/app-connectivity/services';
import { InstallPwaPromptService } from 'src/app/infrastructure/shared-features/pwa/pwa-installation/services';

import { SecurityUserSingletonService } from '../../security/services';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private appSettingsSingleton: AppSettingsSingletonService,
    private appConnectivity: AppConnectivityService,
    private installPwaPrompt: InstallPwaPromptService,
    private translator: TranslateService,
    private securityUserSingleton: SecurityUserSingletonService
  ) { }

  public async initializeAppAsync(): Promise<void> {
    this.appConnectivity.initialize();
    this.installPwaPrompt.registerUpdateAvaliableCallback();
    this.initializeTranslations();
    await this.appSettingsSingleton.initializeAsync();
    await this.securityUserSingleton.initializeAsync();
  }

  private initializeTranslations(): void {
    this.translator.setDefaultLang('en');
    const browserLang = this.translator.getBrowserLang();
    this.translator.use(browserLang);
  }
}
