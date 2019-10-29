import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { RepositoryBaseService } from 'src/app/core/repos';
import { SnackBarService } from 'src/app/core/snack-bar/services';

import { FactServicesModule } from '../../fact-services.module';
import { Fact } from '../models';
import { FactsHttpService } from '../state/http/facts-http.service';

@Injectable({
  providedIn: FactServicesModule
})
export class FactRepositoryService extends RepositoryBaseService<Fact> {
  public constructor(
    private translator: TranslateService,
    private snackbarService: SnackBarService,
    httpService: FactsHttpService) {
    super(httpService);
  }

  public deleteAll$(): Observable<void> {
    return super.deleteAll$().pipe(
      mergeMap(() => {
        return this.translator
          .get('areas.facts.common.services.allFactsDeleted')
          .pipe(tap(info => this.snackbarService.showSnackBar(info)));
      }));
  }
}
