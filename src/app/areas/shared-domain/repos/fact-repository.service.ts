import { Injectable } from '@angular/core';

import { FactOverviewEntry } from '../models';
import { FactEditEntry } from '../models/fact-edit-entry.model';

import { FactsHttpService } from './http/facts-http.service';

@Injectable({
  providedIn: 'root'
})
export class FactRepositoryService {
  public constructor(private httpService: FactsHttpService) { }

  public async loadOverviewAsync(): Promise<FactOverviewEntry[]> {
    return await this.httpService.getAsync('');
  }

  public async deleteFactAsync(factId: number): Promise<void> {
    await this.httpService.deleteAsync(factId.toString());
  }

  public async deleteAllFactsAsync(): Promise<void> {
    this.httpService.deleteAsync('');
  }

  public async loadEditEntryAsync(factId: number): Promise<FactEditEntry> {
    const factEdit = await this.httpService.getAsync<FactEditEntry>(`edit/${factId}`);
    return factEdit;
  }

  public async saveEditEntryAsync(editEntry: FactEditEntry): Promise<void> {
    await this.httpService.putAsync('edit', editEntry);
  }
}
