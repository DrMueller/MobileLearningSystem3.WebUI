import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAllFacts } from 'src/app/areas/facts/common/state';
import { Fact, LearningSession } from 'src/app/areas/shared-domain/models';
import { ArrayExtensions } from 'src/app/utils';

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

  public async createChunksAsync(chunkDefinition: ChunkDefinition): Promise<void> {
    const facts = ArrayExtensions.shuffleEntries(this._facts);
    const chunks = ArrayExtensions.chunk(facts, chunkDefinition.chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[0];
      const learningSession = new LearningSession();
      learningSession.factIds = chunk.map(f => f.id!);
      learningSession.sessionName = chunkDefinition.chunkName + ' ' + i;
      this.store.dispatch(new SaveLearningSessionAction(learningSession));
    }
  }
}
