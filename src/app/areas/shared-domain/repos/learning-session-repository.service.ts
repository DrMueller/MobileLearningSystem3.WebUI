import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LearningSessionsActionTypes } from '../../learning-sessions/common/state';
import {
  DeleteAction,
  DeleteAllLearningSessionsSuccessAction,
  DeleteSuccessAction,
  LoadAllLearningSessionsSuccessAction,
  SaveLearningSessionAction,
  SaveLearningSessionSuccessAction,
} from '../../learning-sessions/common/state/actions';
import { LoadLearningSessionSuccessAction } from '../../learning-sessions/common/state/actions/load-learning-session-success.action';
import { LoadLearningSessionAction } from '../../learning-sessions/common/state/actions/load-learning-session.action';
import { LearningSession } from '../models';

import { LearningSessionsHttpService } from './http/learning-sessions-http.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionRepositoryService {
  public constructor(
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
  public delete$(): Observable<DeleteSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.Delete),
      map((action: DeleteAction) => action.sessionId),
      mergeMap(sessionId =>
        this.httpService.delete$(sessionId).pipe(
          map((id: number) => new DeleteSuccessAction(id))
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

  // @Effect()
  // public loadEdit$(): Observable<LoadEditSuccessAction> {
  //   return this.actions$.pipe(
  //     ofType(LearningSessionsActionTypes.LoadEditSession),
  //     map((action: LoadEditSessionAction) => action.sessionId),
  //     mergeMap(sessionId =>
  //       this.httpService.get$<LearningSession>(sessionId).pipe(
  //         map(entry => {
  //           return new LoadEditSuccessAction(entry);
  //         })
  //       ))
  //   );
  // }

  // @Effect()
  // public loadRunFacts$(): Observable<LoadRunFactsSuccessAction> {
  //   return this.actions$.pipe(
  //     ofType(LearningSessionsActionTypes.LoadRunFacts),
  //     map((action: LoadRunFactsAction) => action.sessionId),
  //     mergeMap(sessionId =>
  //       this.httpService.get$<RunFact[]>(`${sessionId}/runfacts`).pipe(
  //         map(entries => {
  //           return new LoadRunFactsSuccessAction(entries);
  //         })
  //       ))
  //   );
  // }

  // @Effect()
  // public selectNextSession$(): Observable<SelectNextSessionRunFactsSuccessAction> {
  //   return this.actions$.pipe(
  //     ofType(LearningSessionsActionTypes.SelectNextSessionRunFacts),
  //     map((action: SelectNextSessionRunFactsAction) => action.currentSessionId),
  //     mergeMap(sessionId =>
  //       this.httpService.get$<number>(`${sessionId}/next`).pipe(
  //         map(nextId => {
  //           return new SelectNextSessionRunFactsSuccessAction(nextId);
  //         })
  //       ))
  //   );
  // }

  // @Effect()
  // public loadFromNextSession$(): Observable<LoadRunFactsAction> {
  //   return this.actions$.pipe(
  //     ofType(LearningSessionsActionTypes.SelectNextSessionRunFactsSuccess),
  //     map((action: SelectNextSessionRunFactsSuccessAction) => action.newSessionId),
  //     map(sessionId => new LoadRunFactsAction(sessionId))
  //   );
  // }

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

  // @Effect()
  // public updateOverviewEntry$(): Observable<OverviewLoadSuccesssAction> {
  //   return this.actions$.pipe(
  //     ofType(LearningSessionsActionTypes.SaveEditSuccess),
  //     map((action: SaveEditSuccessAction) => action.savedEntryId),
  //     mergeMap(entryId =>
  //       this.httpService.get$<LearningSessionOverviewEntry>(`overview/${entryId}`).pipe(
  //         map(entry => {
  //           const mappedOverview = this._overview.map(itm => itm.id === entry.id ? entry : itm);
  //           return new OverviewLoadSuccesssAction(mappedOverview);
  //         })
  //       ))
  //   );
  // }
}
