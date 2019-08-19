import { Injectable } from '@angular/core';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { FactRepositoryService, LearningSessionRepositoryService } from 'src/app/areas/shared-domain/repos';
import { ArrayExtensions } from 'src/app/utils';

import { ChunkDefinition } from '../models/chunk-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ChunkFactoryService {

  constructor(
    private factRepo: FactRepositoryService,
    private learningSessionRepo: LearningSessionRepositoryService) { }

  public async createChunksAsync(chunkDefinition: ChunkDefinition): Promise<void> {
    let allFacts = await this.factRepo.loadOverviewAsync();
    allFacts = ArrayExtensions.shuffleEntries(allFacts);
    const chunks = ArrayExtensions.chunk(allFacts, chunkDefinition.chunkSize);
    const creationPromises: Promise<void>[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[0];
      const eeditEntry = new LearningSessionEditEntry();
      eeditEntry.factIds = chunk.map(f => f.id);
      eeditEntry.sessionName = chunkDefinition.chunkName + ' ' + i;
      creationPromises.push(this.learningSessionRepo.saveEditEntryAsync(eeditEntry));
    }

    await Promise.all(creationPromises);
  }
}
