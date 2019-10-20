import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { FactsActionTypes } from '../../facts/common/state';
import {
  LoadFactDetailsAction, LoadFactDetailsSuccessAction,
  LoadFactsOverviewSuccessAction, SaveFactDetailsAction, SaveFactDetailsSuccessAction
} from '../../facts/common/state/actions';
import { DeleteFactSuccessAction } from '../../facts/common/state/actions';
import { DeleteFactAction } from '../../facts/common/state/actions';
import { DeleteAllFactsSuccessAction } from '../../facts/common/state/actions/delete-all-facts-success.action';
import { FactOverviewEntryLoadedSuccessAction } from '../../facts/common/state/actions/fact-overview-entry-loaded-success.action';
import { FactOverviewEntry } from '../models';
import { FactEditEntry } from '../models/fact-edit-entry.model';

import { FactsHttpService } from './http/facts-http.service';

@Injectable({
  providedIn: 'root'
})
export class FactRepositoryService {
  public constructor(
    private actions$: Actions,
    private httpService: FactsHttpService) { }


  @Effect()
  public loadOverview$(): Observable<LoadFactsOverviewSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadFactsOverview),
      mergeMap(() =>
        this.httpService.get$<FactOverviewEntry[]>().pipe(
          map(entries => (new LoadFactsOverviewSuccessAction(entries)))
        ))
    );
  }

  @Effect()
  public loadDetails$(): Observable<LoadFactDetailsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadFactDetails),
      map((action: LoadFactDetailsAction) => action.factId),
      mergeMap((factId) =>
        this.httpService.get$<FactEditEntry>(`edit/${factId}`).pipe(
          map(entries => (new LoadFactDetailsSuccessAction(entries)))
        ))
    );
  }

  @Effect()
  public saveDetails$(): Observable<SaveFactDetailsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.SaveFactDetails),
      map((action: SaveFactDetailsAction) => action.entry),
      mergeMap(entry =>
        this.httpService.put$<FactEditEntry>('edit', entry).pipe(
          map(savedEntry => {
            return new SaveFactDetailsSuccessAction(savedEntry.id!);
          })
        ))
    );
  }

  @Effect()
  public delete(): Observable<DeleteFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.DeleteFact),
      map((action: DeleteFactAction) => action.factId),
      mergeMap(factid =>
        this.httpService.delete$<number>(factid).pipe(
          map((id) => {
            return new DeleteFactSuccessAction(id);
          })
        ))
    );
  }

  @Effect()
  public deleteAll$(): Observable<DeleteAllFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.DeleteAllFacts),
      mergeMap(() =>
        this.httpService.delete$<void>().pipe(
          map(() => {
            return new DeleteAllFactsSuccessAction();
          })
        ))
    );
  }

  @Effect()
  public updateOverviewEntry$(): Observable<FactOverviewEntryLoadedSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.SaveFactDetailsSuccess),
      map((action: SaveFactDetailsSuccessAction) => action.savedEntryId),
      mergeMap(entryId =>
        this.httpService.get$<FactOverviewEntry>(`overview/${entryId}`).pipe(
          map(entry => {
            return new FactOverviewEntryLoadedSuccessAction(entry);
          })
        ))
    );
  }
}
