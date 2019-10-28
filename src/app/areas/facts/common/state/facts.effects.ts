import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Fact } from '../models';

import { FactsActionTypes } from '.';
import { DeleteFactAction, DeleteFactSuccessAction, LoadAllFactsSuccessAction } from './actions';
import { DeleteAllFactsSuccessAction } from './actions/delete-all-facts-success.action';
import { LoadFactSuccessAction } from './actions/load-fact-success.action';
import { LoadFactAction } from './actions/load-fact.action';
import { SaveFactSuccessAction } from './actions/save-fact-success.action';
import { SaveFactAction } from './actions/save-faction.action';
import { FactsHttpService } from './http/facts-http.service';

@Injectable({
  providedIn: 'root'
})
export class FactsEffects {
  public constructor(
    private actions$: Actions,
    private httpService: FactsHttpService) { }

  @Effect()
  public loadAll$(): Observable<LoadAllFactsSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadAllFacts),
      mergeMap(() =>
        this.httpService.get$<Fact[]>().pipe(
          map(entries => (new LoadAllFactsSuccessAction(entries)))
        ))
    );
  }

  @Effect()
  public load$(): Observable<LoadFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.LoadFact),
      map((action: LoadFactAction) => action.factId),
      mergeMap((entryId: number) => {
        if (entryId === -1) {
          return of(new LoadFactSuccessAction(new Fact()));
        } else {
          return this.httpService
            .get$<Fact>(entryId)
            .pipe(map(entry => new LoadFactSuccessAction(entry)));
        }
      })
    );
  }

  @Effect()
  public save$(): Observable<SaveFactSuccessAction> {
    return this.actions$.pipe(
      ofType(FactsActionTypes.SaveFact),
      map((action: SaveFactAction) => action.entry),
      mergeMap(entry =>
        this.httpService.put$<Fact>('', entry).pipe(
          map(savedEntry => {
            return new SaveFactSuccessAction(savedEntry);
          })
        ))
    );
  }

  @Effect()
  public delete$(): Observable<DeleteFactSuccessAction> {
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
}
