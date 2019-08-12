import { Injectable } from '@angular/core';
import { FactOverviewEntryDataService } from 'src/app/areas/shared-domain/services';
import { ArrayExtensions } from 'src/app/utils';

import { LearningSessionEditEntry } from '../../edit/models';
import { LearningSessionEditDataService } from '../../edit/services';
import { ChunkDefinition } from '../models/chunk-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ChunkFactoryService {

  constructor(
    private factDataService: FactOverviewEntryDataService,
    private learningSessionDataService: LearningSessionEditDataService) { }

  public async createChunksAsync(chunkDefinition: ChunkDefinition): Promise<void> {
    let allFacts = await this.factDataService.loadOverviewAsync();
    allFacts = ArrayExtensions.shuffleEntries(allFacts);
    const chunks = ArrayExtensions.chunk(allFacts, chunkDefinition.chunkSize);
    const creationPromises: Promise<void>[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[0];
      const eeditEntry = new LearningSessionEditEntry();
      eeditEntry.factIds = chunk.map(f => f.id);
      eeditEntry.sessionName = chunkDefinition.chunkName + ' ' + i;
      creationPromises.push(this.learningSessionDataService.saveEntryAsync(eeditEntry));
    }

    await Promise.all(creationPromises);
  }
}
