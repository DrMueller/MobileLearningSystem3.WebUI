import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ILearningSessionsState, selectAllLearningSessions } from '../../common/state';
import { LearningSessionOverviewVm } from '../view-models/learning-session-overview-entry.vm';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsOverviewService {

  public constructor(private store: Store<ILearningSessionsState>) { }

  public get overview$(): Observable<LearningSessionOverviewVm[]> {
    return this.store.pipe(
      select(selectAllLearningSessions),
      select(sessions => {
        return sessions.map(st => new LearningSessionOverviewVm(
          st.id!,
          st.factIds.length,
          st.sessionName));
      }));
  }
}
