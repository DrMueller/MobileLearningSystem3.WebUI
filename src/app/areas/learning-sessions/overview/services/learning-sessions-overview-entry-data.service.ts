import { Injectable } from '@angular/core';

import { LearningSessionsHttpService } from '../../common/services';
import { LearningSessionOverviewEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsOverviewEntryDataService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async loadOverviewAsync(): Promise<LearningSessionOverviewEntry[]> {
    return await this.httpService.getAsync('');
  }

  public async deleteSessionAsync(sessionId: number): Promise<void> {
    await this.httpService.deleteAsync(sessionId.toString());
  }
}
