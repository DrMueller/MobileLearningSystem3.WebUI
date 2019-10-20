import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selecetOverview } from 'src/app/areas/facts/common/state';
import { FactOverviewEntry, LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { ArrayExtensions } from 'src/app/utils';

import { ILearningSessionsState } from '../../common/state';
import { SaveEditAction } from '../../common/state/actions';
import { ChunkDefinition } from '../models/chunk-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ChunkFactoryService {
  private _facts: FactOverviewEntry[];

  constructor(
    private store: Store<ILearningSessionsState>) {
    this.store
      .pipe(select(selecetOverview))
      .subscribe(sr => this._facts = sr);

  }

  public async createChunksAsync(chunkDefinition: ChunkDefinition): Promise<void> {
    const facts = ArrayExtensions.shuffleEntries(this._facts);
    const chunks = ArrayExtensions.chunk(facts, chunkDefinition.chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[0];
      const editEntry = new LearningSessionEditEntry();
      editEntry.factIds = chunk.map(f => f.id);
      editEntry.sessionName = chunkDefinition.chunkName + ' ' + i;
      this.store.dispatch(new SaveEditAction(editEntry));
    }
  }
}
