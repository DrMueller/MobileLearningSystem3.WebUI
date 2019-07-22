import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingIndicatorService } from '../../core-services/loading-indication/services';
import { AppInitService } from '../app-init/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAppInitialized = false;

  public constructor(
    appInitService: AppInitService,
    private loadingIndicator: LoadingIndicatorService) {
    appInitService.initializeAppAsync().then(() => this.isAppInitialized = true);
  }

  public get showLoadingIndicator$(): Observable<boolean> {
    return this.loadingIndicator.showLoadingIndicator$;
  }
}
