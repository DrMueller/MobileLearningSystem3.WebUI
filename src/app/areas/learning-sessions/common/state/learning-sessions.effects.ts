import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/snack-bar/services';

import { LearningSession } from '../models/learning-session.model';
import { LearningSessionsNavigationService } from '../services';

import { LearningSessionsActionTypes } from '.';
import {
  DeleteAllLearningSessionsSuccessAction,
  DeleteLearningSessionAction, DeleteLearningSessionSuccessAction,
  LoadAllLearningSessionsSuccessAction, LoadLearningSessionAction, LoadLearningSessionSuccessAction,
  LoadNextRunAction, LoadNextRunSuccessAction, SaveLearningSessionAction, SaveLearningSessionSuccessAction
} from './actions';
import { LearningSessionsHttpService } from './http';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsEffects {
  public constructor(
    private translator: TranslateService,
    private snackbarService: SnackBarService,
    private navigator: LearningSessionsNavigationService,
    private actions$: Actions,
    private httpService: LearningSessionsHttpService) {
  }

  @Effect()
  public delete$(): Observable<DeleteLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteLearningSession),
      map((action: DeleteLearningSessionAction) => action.sessionId),
      mergeMap(sessionId =>
        this.httpService.delete$(sessionId).pipe(
          map((id: number) => new DeleteLearningSessionSuccessAction(id))
        ))
    );
  }

  @Effect()
  public deleteAll$(): Observable<DeleteAllLearningSessionsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteAllLearningSessions),
      mergeMap(_ =>
        this.httpService.delete$('').pipe(
          mergeMap(() => {
            return this.translator
              .get('areas.learning-sessions.common.state.allSessionsDeleted')
              .pipe(map((info: string) => {
                this.snackbarService.showSnackBar(info);
                return new DeleteAllLearningSessionsSuccessAction();
              }));
          }))
      ));
  }

  @Effect()
  public load$(): Observable<LoadLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadLearningSession),
      map((action: LoadLearningSessionAction) => action.learningSessionId),
      mergeMap((entryId: number) => {
        if (entryId === -1) {
          return of(new LoadLearningSessionSuccessAction(new LearningSession()));
        } else {
          return this.httpService.get$<LearningSession>(entryId)
            .pipe(map(entry => new LoadLearningSessionSuccessAction(entry)));
        }
      })
    );
  }

  @Effect()
  public loadAll$(): Observable<LoadAllLearningSessionsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadAllLearningSessions),
      mergeMap(_ =>
        this.httpService.get$<LearningSession[]>().pipe(
          map(entries => (new LoadAllLearningSessionsSuccessAction(entries)))
        ))
    );
  }

  @Effect()
  public loadNextRun$(): Observable<LoadNextRunSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadNextRun),
      map((action: LoadNextRunAction) => action.currentLearningSessionId),
      mergeMap((sessionId: number) => {
        return this.httpService.get$<number>(`${sessionId}/next`)
          .pipe(map(nextId => {
            this.navigator.navigateToSessionRun(nextId);
            return new LoadNextRunSuccessAction();
          }));
      })
    );
  }

  @Effect()
  public save$(): Observable<SaveLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SaveLearningSession),
      map((action: SaveLearningSessionAction) => action.editEntry),
      mergeMap(editEntry =>
        this.httpService.put$<LearningSession>('', editEntry).pipe(
          map(entry => {
            return new SaveLearningSessionSuccessAction(entry);
          })
        ))
    );
  }
}
