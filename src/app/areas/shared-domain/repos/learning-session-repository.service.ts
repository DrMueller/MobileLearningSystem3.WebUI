import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LearningSessionsNavigationService } from '../../learning-sessions/common/services';
import { LearningSessionsActionTypes } from '../../learning-sessions/common/state';
import {
  DeleteAllLearningSessionsSuccessAction,
  DeleteLearningSessionAction,
  DeleteLearningSessionSuccessAction,
  LoadAllLearningSessionsSuccessAction,
  LoadNextRunAction,
  SaveLearningSessionAction,
  SaveLearningSessionSuccessAction,
} from '../../learning-sessions/common/state/actions';
import { LoadLearningSessionSuccessAction } from '../../learning-sessions/common/state/actions/load-learning-session-success.action';
import { LoadLearningSessionAction } from '../../learning-sessions/common/state/actions/load-learning-session.action';
import { LoadNextRunSuccessAction } from '../../learning-sessions/common/state/actions/load-next-run-success.action';
import { LearningSession } from '../models';

import { LearningSessionsHttpService } from './http/learning-sessions-http.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionRepositoryService {
  public constructor(
    private navigator: LearningSessionsNavigationService,
    private actions$: Actions,
    private httpService: LearningSessionsHttpService) {
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
  public deleteAll$(): Observable<DeleteAllLearningSessionsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteAllLearningSessions),
      mergeMap(_ =>
        this.httpService.delete$('').pipe(
          map(() => (new DeleteAllLearningSessionsSuccessAction()))
        ))
    );
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
  public load$(): Observable<LoadLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadLearningSession),
      map((action: LoadLearningSessionAction) => action.learningSessionId),
      mergeMap((entryId: number) => {
        if (entryId === -1) {
          return of(new LoadLearningSessionSuccessAction(new LearningSession()));
        } else {
          return this.httpService.get$<LearningSession>(entryId)
            .pipe(map(entry => (new LoadLearningSessionSuccessAction(entry))));
        }
      })
    );
  }

  @Effect()
  public loadNextRun$(): Observable<LoadNextRunSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadNextRun),
      map((action: LoadNextRunAction) => action.currentLearningSessionId),
      mergeMap((sessionId: number) => {
        debugger;
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
