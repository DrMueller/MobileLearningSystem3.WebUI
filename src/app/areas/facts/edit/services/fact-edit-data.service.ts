import { Injectable } from '@angular/core';
import { FactsHttpService } from 'src/app/areas/shared-domain/services';

import { FactServicesModule } from '../../fact-services.module';
import { FactEditEntry } from '../models';

@Injectable({
  providedIn: FactServicesModule
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
