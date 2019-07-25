import { Injectable } from '@angular/core';

import { LearningSessionsHttpService } from '../../common/services';
import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionOverviewEntry } from '../models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionsOverviewEntryDataService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async loadOverviewAsync(): Promise<LearningSessionOverviewEntry[]> {
    return await this.httpService.getAsync('');
  }

  public async deleteSessionAsync(sessionId: number): Promise<void> {
    await this.httpService.deleteAsync(sessionId.toString());
  }

  public async deleteAllSessionsAsync(): Promise<void> {
    await this.httpService.deleteAsync('');
  }
}
