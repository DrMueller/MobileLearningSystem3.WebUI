import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { getOverview, ILearningSessionsState, LearningSessionsActionTypes } from '../../learning-sessions/common/state';
import {
  DeleteAction,
  DeleteAllSuccessAction,
  DeleteSuccessAction,
  LoadEditSessionAction,
  LoadEditSuccessAction,
  LoadRunFactsAction,
  OverviewLoadSuccesssAction,
  SaveEditAction,
  SaveEditSuccessAction,
  SelectNextSessionRunFactsAction,
  SelectNextSessionRunFactsSuccessAction
} from '../../learning-sessions/common/state/actions';
import { LoadRunFactsSuccessAction } from '../../learning-sessions/common/state/actions/load-run-facts-success.action';
import { LearningSessionEditEntry, LearningSessionOverviewEntry, RunFact } from '../models';

import { LearningSessionsHttpService } from './http/learning-sessions-http.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionRepositoryService {
  private _overview: LearningSessionOverviewEntry[];

  public constructor(
    private actions$: Actions,
    private httpService: LearningSessionsHttpService,
    private store: Store<ILearningSessionsState>) {
    this.store
      .pipe(select(getOverview))
      .subscribe(sr => this._overview = sr);
  }

  @Effect()
  public loadOverview$(): Observable<OverviewLoadSuccesssAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadOverview),
      mergeMap(_ =>
        this.httpService.get$<LearningSessionOverviewEntry[]>('').pipe(
          map(entries => (new OverviewLoadSuccesssAction(entries)))
        ))
    );
  }

  @Effect()
  public deleteAll$(): Observable<DeleteAllSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.DeleteAll),
      mergeMap(_ =>
        this.httpService.delete$('').pipe(
          map(() => (new DeleteAllSuccessAction()))
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
  public loadEdit$(): Observable<LoadEditSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadEditSession),
      map((action: LoadEditSessionAction) => action.sessionId),
      mergeMap(sessionId =>
        this.httpService.get$<LearningSessionEditEntry>(`edit/${sessionId}`).pipe(
          map(entry => {
            return new LoadEditSuccessAction(entry);
          })
        ))
    );
  }

  @Effect()
  public loadRunFacts$(): Observable<LoadRunFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadRunFacts),
      map((action: LoadRunFactsAction) => action.sessionId),
      mergeMap(sessionId =>
        this.httpService.get$<RunFact[]>(`${sessionId}/runfacts`).pipe(
          map(entries => {
            return new LoadRunFactsSuccessAction(entries);
          })
        ))
    );
  }

  @Effect()
  public selectNextSession$(): Observable<SelectNextSessionRunFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SelectNextSessionRunFacts),
      map((action: SelectNextSessionRunFactsAction) => action.currentSessionId),
      mergeMap(sessionId =>
        this.httpService.get$<number>(`${sessionId}/next`).pipe(
          map(nextId => {
            return new SelectNextSessionRunFactsSuccessAction(nextId);
          })
        ))
    );
  }

  @Effect()
  public loadFromNextSession$(): Observable<LoadRunFactsAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SelectNextSessionRunFactsSuccess),
      map((action: SelectNextSessionRunFactsSuccessAction) => action.newSessionId),
      map(sessionId => new LoadRunFactsAction(sessionId))
    );
  }

  @Effect()
  public saveEdit$(): Observable<SaveEditSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SaveEdit),
      map((action: SaveEditAction) => action.editEntry),
      mergeMap(editEntry =>
        this.httpService.put$<LearningSessionEditEntry>('edit', editEntry).pipe(
          map(entry => {
            return new SaveEditSuccessAction(entry.id);
          })
        ))
    );
  }

  @Effect()
  public updateOverviewEntry$(): Observable<OverviewLoadSuccesssAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SaveEditSuccess),
      map((action: SaveEditSuccessAction) => action.savedEntryId),
      mergeMap(entryId =>
        this.httpService.get$<LearningSessionOverviewEntry>(`overview/${entryId}`).pipe(
          map(entry => {
            const mappedOverview = this._overview.map(itm => itm.id === entry.id ? entry : itm);
            return new OverviewLoadSuccesssAction(mappedOverview);
          })
        ))
    );
  }
}
