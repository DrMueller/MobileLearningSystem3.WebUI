import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsSingletonService } from 'src/app/core/app-settings/services';
import { AppConnectivityService } from 'src/app/shared/pwa/app-connectivity/services';
import { InstallPwaPromptService } from 'src/app/shared/pwa/pwa-installation/services';

import { AuthenticationService } from '../../security/services';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(
    private appSettingsSingleton: AppSettingsSingletonService,
    private appConnectivity: AppConnectivityService,
    private installPwaPrompt: InstallPwaPromptService,
    private translator: TranslateService,
    private authenticationService: AuthenticationService
  ) { }

  public async initializeAppAsync(): Promise<void> {
    this.initializeTranslations();
    await this.appSettingsSingleton.initializeAsync();
    this.authenticationService.initialize();
    this.appConnectivity.initialize();
    this.installPwaPrompt.registerUpdateAvaliableCallback();
  }

  private initializeTranslations(): void {
    this.translator.setDefaultLang('en');
    const browserLang = this.translator.getBrowserLang();
    this.translator.use(browserLang);
  }
}
