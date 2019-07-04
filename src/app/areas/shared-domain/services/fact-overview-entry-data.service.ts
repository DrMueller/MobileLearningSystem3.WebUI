import { Injectable } from '@angular/core';

import { FactOverviewEntry } from '../models/fact-overview-entry.model';

import { FactsHttpService } from './facts-http.service';

@Injectable({
  providedIn: 'root'
})
export class FactOverviewEntryDataService {
  public constructor(private httpService: FactsHttpService) { }

  public async loadOverviewAsync(): Promise<FactOverviewEntry[]> {
    return await this.httpService.getAsync('');
  }

  public async deleteFactAsync(factId: number): Promise<void> {
    await this.httpService.deleteAsync(factId.toString());
  }
}
