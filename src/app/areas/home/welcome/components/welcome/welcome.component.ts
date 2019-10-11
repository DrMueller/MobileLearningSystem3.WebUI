import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { HelloHttpService } from 'src/app/areas/hello/common/services';
import { SnackBarConfiguration } from 'src/app/core/snack-bar/models';
import { SnackBarService } from 'src/app/core/snack-bar/services';
import { PwaInstallationService } from 'src/app/shared/pwa/pwa-installation/services';
import { getUserName, ISecurityState } from 'src/app/shell/app-state';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public isBusyIndicatorShown = false;
  public userName: string;

  public constructor(
    private pwaInstallationService: PwaInstallationService,
    private snackBarService: SnackBarService,
    private translator: TranslateService,
    private helloHttpService: HelloHttpService,
    private store: Store<ISecurityState>) { }

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

  public ngOnInit(): void {
    this.store.pipe(select(getUserName)).subscribe(name => {
      this.userName = name;
    });
  }

  public async sayHelloFromServerAsync(): Promise<void> {
    const returnedMessage = await this.helloHttpService.getAsync<any>(this.userName);
    const snackbarInfo = await this.translator.get('areas.home.welcome.components.welcome.serverResponseInfo').toPromise();

    const info = snackbarInfo + returnedMessage.helloMessage;
    this.snackBarService.showSnackBar(info, new SnackBarConfiguration(10));
  }
}
