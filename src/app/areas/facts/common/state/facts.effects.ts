import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Fact } from '../models';
import { FactRepositoryService } from '../services';

import { FactsActionTypes } from '.';
import { DeleteFactAction, DeleteFactSuccessAction, LoadAllFactsSuccessAction } from './actions';
import { DeleteAllFactsSuccessAction } from './actions/delete-all-facts-success.action';
import { LoadFactSuccessAction } from './actions/load-fact-success.action';
import { LoadFactAction } from './actions/load-fact.action';
import { SaveFactSuccessAction } from './actions/save-fact-success.action';
import { SaveFactAction } from './actions/save-faction.action';

@Injectable({
  providedIn: 'root'
})
export class FactsEffects {
  public constructor(
    private actions$: Actions,
    private repo: FactRepositoryService) {
    }

  @Effect()
  public loadAll$(): Observable<LoadAllFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadAllFacts),
      mergeMap(() =>
        this.repo.loadAll$().pipe(
          map(entries => new LoadAllFactsSuccessAction(entries))
        ))
    );
  }

  @Effect()
  public load$(): Observable<LoadFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadFact),
      map((action: LoadFactAction) => action.factId),
      mergeMap(entryId => this.repo.load$(entryId, Fact).pipe(
        map(loadedEntry => new LoadFactSuccessAction(loadedEntry))
      )));
  }

  @Effect()
  public save$(): Observable<SaveFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.SaveFact),
      map((action: SaveFactAction) => action.entry),
      mergeMap(entry => this.repo.save$(entry).pipe(
        map(savedEntry => new SaveFactSuccessAction(savedEntry))
      )));
  }

  @Effect()
  public delete$(): Observable<DeleteFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.DeleteFact),
      map((action: DeleteFactAction) => action.factId),
      mergeMap(factid => this.repo.delete$(factid).pipe(
        map(deletedId => new DeleteFactSuccessAction(deletedId))
      )));
  }

  @Effect()
  public deleteAll$(): Observable<DeleteAllFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.DeleteAllFacts),
      mergeMap(() => this.repo.deleteAll$().pipe(
        map(() => new DeleteAllFactsSuccessAction())
      )));
  }
}
