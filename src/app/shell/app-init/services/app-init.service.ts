import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsSingletonService } from 'src/app/core/app-settings/services';
import { AppConnectivityService } from 'src/app/shared/pwa/app-connectivity/services';
import { InstallPwaPromptService } from 'src/app/shared/pwa/pwa-installation/services';

import { IAppState } from '../../app-state';
import { InitializeUserAction } from '../../security/state/actions/initialize-user.action';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(
    private appSettingsSingleton: AppSettingsSingletonService,
    private appConnectivity: AppConnectivityService,
    private installPwaPrompt: InstallPwaPromptService,
    private translator: TranslateService,
    private store: Store<IAppState>
  ) { }

  public async initializeAppAsync(): Promise<void> {
    this.initializeTranslations();
    await this.appSettingsSingleton.initializeAsync();
    this.store.dispatch(new InitializeUserAction());
    this.appConnectivity.initialize();
    this.installPwaPrompt.registerUpdateAvaliableCallback();
  }

  private initializeTranslations(): void {
    this.translator.setDefaultLang('en');
    const browserLang = this.translator.getBrowserLang();
    this.translator.use(browserLang);
  }
}
