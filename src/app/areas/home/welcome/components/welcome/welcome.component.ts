import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelloHttpService } from 'src/app/areas/hello/common/services';
import { SecurityUserSingletonService } from 'src/app/infrastructure/app-shell/security/services';
import { SnackBarConfiguration } from 'src/app/infrastructure/core-services/snack-bar/models';
import { SnackBarService } from 'src/app/infrastructure/core-services/snack-bar/services';
import { PwaInstallationService } from 'src/app/infrastructure/shared-features/pwa/pwa-installation/services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  public isBusyIndicatorShown = false;

  public constructor(
    private pwaInstallationService: PwaInstallationService,
    private snackBarService: SnackBarService,
    private translator: TranslateService,
    private userSingleton: SecurityUserSingletonService,
    private helloHttpService: HelloHttpService) { }

  public toggleBusyIndicator(): void {
    this.isBusyIndicatorShown = !this.isBusyIndicatorShown;
  }

  public get canInstallAsPwa(): boolean {
    return this.pwaInstallationService.canInstallAsPwa;
  }

  public installAsPwa(): void {
    return this.pwaInstallationService.installAsPwa();
  }

  public async showSnackBarAsync(): Promise<void> {
    const helloWorld = await this.translator.get('areas.home.welcome.components.welcome.helloWorld').toPromise();
    this.snackBarService.showSnackBar(helloWorld);
  }

  public async sayHelloFromServerAsync(): Promise<void> {
    const returnedMessage = await this.helloHttpService.getAsync<any>(this.userSingleton.instance.userName);
    const snackbarInfo = await this.translator.get('areas.home.welcome.components.welcome.serverResponseInfo').toPromise();

    const info = snackbarInfo + returnedMessage.helloMessage;
    this.snackBarService.showSnackBar(info, new SnackBarConfiguration(10));
  }
}
