import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Fact } from 'src/app/areas/facts/common/models/fact.model';
import { selectAllFacts } from 'src/app/areas/facts/common/state';
import { shuffleArray } from 'src/app/utils/array-utils';
import { chunkArray } from 'src/app/utils/array-utils/chunk.func';

import { LearningSession } from '../../common/models/learning-session.model';
import { ILearningSessionsState } from '../../common/state';
import { SaveLearningSessionAction } from '../../common/state/actions';
import { ChunkDefinition } from '../models/chunk-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ChunkFactoryService {
  private _facts: Fact[];

  constructor(
    private store: Store<ILearningSessionsState>) {
    this.store
      .pipe(select(selectAllFacts))
      .subscribe(sr => this._facts = sr);
  }

  public createChunks(chunkDefinition: ChunkDefinition): void {
    const facts = shuffleArray(this._facts);
    const chunks = chunkArray(facts, chunkDefinition.chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const learningSession = new LearningSession();
      learningSession.factIds = chunk.map(f => f.id!);
      learningSession.sessionName = chunkDefinition.chunkName + ' ' + i;
      this.store.dispatch(new SaveLearningSessionAction(learningSession));
    }
  }
}
