import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LearningSessionsActionTypes } from '../../learning-sessions/common/state';
import {
  LoadEditAction,
  LoadEditSuccessAction,
  OverviewLoadSuccesssAction,
  SaveEditAction, SaveEditSuccessAction
} from '../../learning-sessions/common/state/actions';
import { LearningSessionEditEntry, LearningSessionOverviewEntry, RunFact } from '../models';

import { LearningSessionsHttpService } from './http/learning-sessions-http.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionRepositoryService {
  public constructor(
    private actions$: Actions,
    private httpService: LearningSessionsHttpService) { }

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


  public async deleteAllAsync(): Promise<void> {
    await this.httpService.deleteAsync('');
  }

  public async deleteAsync(sessionId: number): Promise<void> {
    await this.httpService.deleteAsync(sessionId.toString());
  }

  @Effect()
  public loadEdit$(): Observable<LoadEditSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.LoadEdit),
      map((action: LoadEditAction) => action.sessionId),
      mergeMap(sessionId =>
        this.httpService.get$<LearningSessionEditEntry>(`edit/${sessionId}`).pipe(
          map(entry => {
            return new LoadEditSuccessAction(entry);
          })
        ))
    );
  }

  public async loadRunFactsAsync(sessionId: number): Promise<RunFact[]> {
    return await this.httpService.getAsync(`${sessionId}/runfacts`);
  }

  public async loadNextSessionIdAsync(currentSessionId: number): Promise<number> {
    return await this.httpService.getAsync(`${currentSessionId}/nextid`);
  }

  @Effect()
  public saveEdit$(): Observable<SaveEditSuccessAction> {
    return this.actions$.pipe(
      ofType(LearningSessionsActionTypes.SaveEdit),
      map((action: SaveEditAction) => action.editEntry),
      mergeMap(editEntry =>
        this.httpService.put$<LearningSessionEditEntry>('edit', editEntry).pipe(
          map(entry => {
            debugger;
            here;
            return new SaveEditSuccessAction(entry);
          })
        ))
    );
  }
}
