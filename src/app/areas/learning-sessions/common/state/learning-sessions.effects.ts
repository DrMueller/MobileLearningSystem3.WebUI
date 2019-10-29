import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { LearningSession } from '../models';
import { LearningSessionRepositoryService, LearningSessionsNavigationService } from '../services';

import { LearningSessionsActionTypes } from '.';
import {
  DeleteAllLearningSessionsSuccessAction,
  DeleteLearningSessionAction, DeleteLearningSessionSuccessAction,
  LoadAllLearningSessionsSuccessAction, LoadLearningSessionAction, LoadLearningSessionSuccessAction,
  LoadNextRunAction, LoadNextRunSuccessAction, SaveLearningSessionAction, SaveLearningSessionSuccessAction
} from './actions';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsEffects {
  public constructor(
    private navigator: LearningSessionsNavigationService,
    private actions$: Actions,
    private repo: LearningSessionRepositoryService) {
  }

  @Effect()
  public delete$(): Observable<DeleteLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteLearningSession),
      map((action: DeleteLearningSessionAction) => action.sessionId),
      mergeMap(sessionId => this.repo.delete$(sessionId).pipe(
        map((id: number) => new DeleteLearningSessionSuccessAction(id))
      ))
    );
  }

  @Effect()
  public deleteAll$(): Observable<DeleteAllLearningSessionsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteAllLearningSessions),
      mergeMap(() =>
        this.repo.deleteAll$().pipe(
          map(() => new DeleteAllLearningSessionsSuccessAction()))
      )
    );
  }

  @Effect()
  public load$(): Observable<LoadLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadLearningSession),
      map((action: LoadLearningSessionAction) => action.learningSessionId),
      mergeMap((entryId: number) =>
        this.repo.load$(entryId, LearningSession)
          .pipe(map(entry => new LoadLearningSessionSuccessAction(entry)))
      ));
  }

  @Effect()
  public loadAll$(): Observable<LoadAllLearningSessionsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadAllLearningSessions),
      mergeMap(() =>
        this.repo.loadAll$().pipe(
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
        return this.repo.loadNextId$(sessionId)
          .pipe(
            tap(nextId => this.navigator.navigateToSessionRun(nextId)),
            map(() => new LoadNextRunSuccessAction())
          );
      })
    );
  }

  @Effect()
  public save$(): Observable<SaveLearningSessionSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SaveLearningSession),
      map((action: SaveLearningSessionAction) => action.editEntry),
      mergeMap(editEntry =>
        this.repo.save$(editEntry).pipe(
          map(entry => {
            return new SaveLearningSessionSuccessAction(entry);
          })
        ))
    );
  }
}
