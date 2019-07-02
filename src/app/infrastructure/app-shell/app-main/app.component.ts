import { Component } from '@angular/core';

import { AppInitService } from '../app-init/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAppInitialized = false;

  public constructor(
    appInitService: AppInitService) {
    appInitService.initializeAppAsync().then(() => this.isAppInitialized = true);
  }
}
