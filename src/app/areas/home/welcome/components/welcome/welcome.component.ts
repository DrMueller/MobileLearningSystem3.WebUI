import { Component } from '@angular/core';
import { InstallPwaPromptService, PwaInstallationService } from 'src/app/infrastructure/shared-features/pwa/pwa-installation/services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  public isBusyIndicatorShown = false;

  public constructor(private pwaInstallationService: PwaInstallationService, private prompt: InstallPwaPromptService) { }

  public toggleBusyIndicator(): void {
    this.isBusyIndicatorShown = !this.isBusyIndicatorShown;
  }

  public get event(): any {
    return this.prompt.event;
  }

  public get canInstallAsPwa(): boolean {
    return this.pwaInstallationService.canInstallAsPwa;
  }

  public installAsPwa(): void {
    return this.pwaInstallationService.installAsPwa();
  }
}
