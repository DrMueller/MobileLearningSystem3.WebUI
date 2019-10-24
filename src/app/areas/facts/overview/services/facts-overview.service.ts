import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFactsState, selectFacts } from '../../common/state';
import { FactOverviewEntryVm } from '../view-models';

@Injectable({
  providedIn: 'root'
})
export class FactsOverviewService {

  constructor(private store: Store<IFactsState>) { }

  public get overview$(): Observable<FactOverviewEntryVm[]> {
    const tra = this.store.pipe(
      select(selectFacts),
      select(state => state.map(st => new FactOverviewEntryVm(
        st.id!,
        st.creationDate.toLocaleDateString(),
        st.questionText)))
    );

    return tra;
  }
}
