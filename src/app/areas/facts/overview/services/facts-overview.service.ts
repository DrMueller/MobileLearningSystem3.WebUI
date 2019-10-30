import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFactsState, selectAllFacts } from '../../common/state';
import { FactOverviewEntryVm } from '../view-models';

@Injectable({
  providedIn: 'root'
})
export class FactsOverviewService {
  public constructor(private store: Store<IFactsState>) { }

  public get overview$(): Observable<FactOverviewEntryVm[]> {
    return this.store.pipe(
      select(selectAllFacts),
      map(facts => {
        return facts.map(st => new FactOverviewEntryVm(
          st.id!,
          st.creationDate,
          st.questionText));
      }));
  }
}
