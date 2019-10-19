import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { FactRepositoryService } from 'src/app/areas/shared-domain/repos';
import { ArrayExtensions } from 'src/app/utils';

import { ILearningSessionsState } from '../../common/state';
import { SaveEditAction } from '../../common/state/actions';
import { ChunkDefinition } from '../models/chunk-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ChunkFactoryService {

  constructor(
    private factRepo: FactRepositoryService,
    private store: Store<ILearningSessionsState>) { }

  public async createChunksAsync(chunkDefinition: ChunkDefinition): Promise<void> {
    let allFacts = await this.factRepo.loadOverviewAsync();
    allFacts = ArrayExtensions.shuffleEntries(allFacts);
    const chunks = ArrayExtensions.chunk(allFacts, chunkDefinition.chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[0];
      const editEntry = new LearningSessionEditEntry();
      editEntry.factIds = chunk.map(f => f.id);
      editEntry.sessionName = chunkDefinition.chunkName + ' ' + i;
      this.store.dispatch(new SaveEditAction(editEntry));
    }
  }
}
