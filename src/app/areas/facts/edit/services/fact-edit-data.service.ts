import { Injectable } from '@angular/core';
import { FactsHttpService } from '../../common/services';
import { FactEditEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FactEditDataService {
  public constructor(private httpService: FactsHttpService) { }

  public async loadEntryEditAsync(factId: number): Promise<FactEditEntry> {
    const factEdit = await this.httpService.getAsync<FactEditEntry>(`edit/${factId}`);
    return factEdit;
  }

  public async saveEntryAsync(editEntry: FactEditEntry): Promise<void> {
    await this.httpService.putAsync('edit', editEntry);
  }
}
