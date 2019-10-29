import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { RepositoryBaseService } from 'src/app/core/repos';
import { SnackBarService } from 'src/app/core/snack-bar/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSession } from '../models';

import { LearningSessionsHttpService } from './http';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionRepositoryService extends RepositoryBaseService<LearningSession> {
  public constructor(
    private translator: TranslateService,
    private snackbarService: SnackBarService,
    httpService: LearningSessionsHttpService) {
    super(httpService);
  }

  public deleteAll$(): Observable<void> {
    return super.deleteAll$().pipe(
      mergeMap(() => {
        return this.translator
          .get('areas.learning-sessions.common.services.allSessionsDeleted')
          .pipe(tap(info => this.snackbarService.showSnackBar(info))
          );
      }));
  }

  public loadNextId$(currentId: number): Observable<number> {
    return this.httpService.get$<number>(`${currentId}/next`);
  }
}
