import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingIndicatorService } from '../../core-services/loading-indication/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(
    private loadingIndicator: LoadingIndicatorService) {
  }

  public get showLoadingIndicator$(): Observable<boolean> {
    return this.loadingIndicator.showLoadingIndicator$;
  }
}
