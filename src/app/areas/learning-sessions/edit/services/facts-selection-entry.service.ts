import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllFacts } from 'src/app/areas/facts/common/state';

import { ILearningSessionsState } from '../../common/state';
import { FactSelectionEntryVm } from '../view-models';

@Injectable({
  providedIn: 'root'
})
export class FactsSelectionEntryService {

  public constructor(private store: Store<ILearningSessionsState>) { }

  public get entries$(): Observable<FactSelectionEntryVm[]> {
    return this.store
      .pipe(
        select(selectAllFacts),
        map(facts => facts.map(fact => new FactSelectionEntryVm(
          fact.id!,
          fact.questionText,
          fact.learningSessionIds.length > 0,
          fact.creationDate))));
  }
}
